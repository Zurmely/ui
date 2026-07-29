#!/usr/bin/env python3
"""Report probable ASD-STE100 violations in Markdown prose.

Usage:
    python3 check_ste.py FILE [FILE ...]
    python3 check_ste.py --max-findings 40 README.md

Only prose is checked. Fenced code blocks, indented code blocks, tables,
front matter, headings, inline code spans, link targets, and HTML blocks are
ignored. Findings are heuristics that need human judgement, not verdicts.

Exit code 0 means no findings. Exit code 1 means findings were reported.
Exit code 2 means a file could not be read.
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass

PROCEDURAL_WORD_LIMIT = 20
DESCRIPTIVE_WORD_LIMIT = 25
NOUN_CLUSTER_LIMIT = 3
PARAGRAPH_SENTENCE_LIMIT = 6

# Words to replace. Key is a lowercase regex body; value is the advice.
NOT_APPROVED = {
    r"utilize[sd]?|utilizing": "use",
    r"leverage[sd]?|leveraging": "use",
    r"facilitate[sd]?": "help",
    r"ensure[sd]?|ensuring": "make sure, confirm",
    r"guarantee[sd]?": "make sure",
    r"perform(s|ed|ing)?": "do, run",
    r"obtain(s|ed|ing)?": "get",
    r"acquire[sd]?": "get",
    r"indicate[sd]?|indicating": "show",
    r"determine[sd]?|determining": "find, set, decide",
    r"modify|modifie[sd]|modifying": "change",
    r"verify|verifie[sd]|verifying": "check, confirm",
    r"commence[sd]?|initiate[sd]?": "start",
    r"terminate[sd]?": "stop, end",
    r"accommodate[sd]?": "hold, support",
    r"functionality": "function, feature, behavior",
    r"capabilit(y|ies)": "function, feature",
    r"utilization|usages?": "use",
    r"numerous|a multitude of": "many",
    r"a variety of": "several, different",
    r"approximately": "about",
    r"prior to": "before",
    r"subsequent to": "after",
    r"in order to": "to",
    r"due to the fact that": "because",
    r"in the event that": "if",
    r"with respect to": "about, for",
    r"additionally|furthermore|moreover": "also",
    r"via": "with, through",
    r"etc\.?": "name the items",
    r"e\.g\.": "for example",
    r"i\.e\.": "that is",
    r"simply|just|merely": "delete",
    r"very|extremely|quite": "delete",
    r"please": "delete",
    r"robust|powerful|seamless|elegant|intuitive|user-friendly": "delete, or state the property",
    r"lightweight": "state the size",
    r"best practices?": "rule, requirement, convention",
    r"under the hood|out of the box": "state the mechanism",
    r"first-class": "supported",
    r"may|might|could|shall|ought to": "can, or must",
    r"and/or": "and, or or",
}

WEAK_MODALS = re.compile(r"\b(may|might|could|shall|ought to)\b", re.I)

PASSIVE = re.compile(
    r"\b(is|are|was|were|be|been|being|get|gets|got)\s+"
    r"(\w+ed|written|shown|given|taken|made|set|built|kept|held|read|sent|found|done|used|put|chosen|drawn)\b",
    re.I,
)

PROGRESSIVE_OR_PERFECT = re.compile(
    r"\b(is|are|was|were|has|have|had|will)\s+(been\s+)?\w+(ing|ed)\b", re.I
)

# A possessive apostrophe is allowed, so 's is matched only in known contractions.
CONTRACTION = re.compile(
    r"\b(\w+['\u2019](t|re|ve|ll|d|m)|(it|that|there|here|what|who|let|he|she)['\u2019]s)\b",
    re.I,
)

IMPERATIVE_START = re.compile(
    r"^(use|do|add|run|read|write|keep|set|check|confirm|ask|report|see|prefer|start|stop|"
    r"replace|remove|change|split|state|name|give|make|put|avoid|treat|follow|copy|list|"
    r"break|define|turn|call|import|build|verify|note|choose|apply)\b",
    re.I,
)

SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z`\"'(\[])")

# Lowercase words that commonly chain into noun clusters.
CLUSTER_STOP = {
    "a", "an", "the", "and", "or", "but", "if", "for", "of", "in", "on", "to",
    "with", "without", "from", "at", "by", "as", "that", "this", "these",
    "those", "is", "are", "was", "were", "be", "not", "no", "do", "does",
    "can", "must", "then", "than", "when", "where", "which", "it", "its",
    "you", "we", "they", "he", "she", "one", "each", "every", "any", "all",
    "also", "only", "more", "most", "less", "same", "other", "such", "so",
    "because", "before", "after", "into", "over", "under", "per", "via",
    "use", "uses", "used", "has", "have", "had", "will", "should", "may",
    "across", "between", "among", "during", "within", "through", "about",
    "above", "below", "against", "along", "around", "behind", "beyond",
    "upon", "until", "while", "instead", "however", "already", "always",
    "never", "often", "still", "yet", "both", "either", "neither",
    # Frequent verbs in specification prose. A verb ends a noun cluster.
    "need", "needs", "show", "shows", "keep", "keeps", "stay", "stays",
    "map", "maps", "remain", "remains", "convey", "conveys", "get", "gets",
    "make", "makes", "set", "sets", "provide", "provides", "include",
    "includes", "define", "defines", "mean", "means", "require", "requires",
    "allow", "allows", "add", "adds", "change", "changes", "work", "works",
    "run", "runs", "read", "reads", "write", "writes", "ask", "asks",
    "check", "checks", "confirm", "confirms", "start", "starts", "stop",
    "stops", "replace", "replaces", "remove", "removes", "split", "splits",
    "state", "states", "give", "gives", "put", "puts", "avoid", "avoids",
    "follow", "follows", "apply", "applies", "call", "calls", "turn",
    "turns", "choose", "chooses", "carry", "carries", "let", "lets",
    "display", "displays", "render", "renders", "return", "returns",
    "accept", "accepts", "expect", "expects", "support", "supports",
    "control", "controls", "prevent", "prevents", "meet", "meets",
    "reflect", "reflects", "inherit", "inherits", "help", "helps",
    "exist", "exists", "answer", "answers", "vs",
}

CLUSTER_BREAK = re.compile(r"[,.;:!?()\[\]\"\u201c\u201d/]")


@dataclass
class Finding:
    line: int
    kind: str
    detail: str


def strip_inline(text: str) -> str:
    """Remove spans that are technical names, not prose."""
    text = re.sub(r"`[^`]*`", " CODE ", text)
    text = re.sub(r"!?\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\*\*|__|\*|_", "", text)
    return text


def is_skippable(line: str) -> bool:
    stripped = line.strip()
    if not stripped:
        return True
    if stripped.startswith("#"):
        return True
    if stripped.startswith("|") or re.match(r"^[\s|:-]+$", stripped):
        return True
    if stripped.startswith(">") and stripped.count(">") > 1:
        return False
    if re.match(r"^(---|\*\*\*|___)$", stripped):
        return True
    if line.startswith("    ") or line.startswith("\t"):
        return True
    if stripped.startswith("<"):
        return True
    return False


def prose_lines(lines: list[str]) -> list[tuple[int, str]]:
    """Return (1-based line number, prose text) pairs."""
    out: list[tuple[int, str]] = []
    in_fence = False
    fence_marker = ""
    in_front_matter = False

    for index, raw in enumerate(lines, start=1):
        stripped = raw.strip()

        if index == 1 and stripped == "---":
            in_front_matter = True
            continue
        if in_front_matter:
            if stripped == "---":
                in_front_matter = False
            continue

        fence = re.match(r"^\s*(`{3,}|~{3,})", raw)
        if fence:
            marker = fence.group(1)[0] * 3
            if not in_fence:
                in_fence, fence_marker = True, marker
            elif marker == fence_marker:
                in_fence, fence_marker = False, ""
            continue
        if in_fence or is_skippable(raw):
            continue

        text = strip_inline(raw)
        text = re.sub(r"^\s*([-*+]|\d+[.)])\s+", "", text)
        text = re.sub(r"^\s*>\s?", "", text)
        text = re.sub(r"^\s*- \[[ xX]\]\s*", "", text)
        text = text.strip()
        if text:
            out.append((index, text))
    return out


def sentences_of(text: str) -> list[str]:
    return [s.strip() for s in SENTENCE_SPLIT.split(text) if s.strip()]


def word_count(sentence: str) -> int:
    return len(re.findall(r"[A-Za-z0-9][A-Za-z0-9\-']*", sentence))


def longest_noun_cluster(sentence: str) -> tuple[int, str]:
    best_len, best = 0, ""
    for segment in CLUSTER_BREAK.split(sentence):
        run: list[str] = []
        for token in re.findall(r"[A-Za-z][A-Za-z\-]*", segment):
            low = token.lower()
            if low in CLUSTER_STOP or token == "CODE" or token[0].isupper():
                if len(run) > best_len:
                    best_len, best = len(run), " ".join(run)
                run = []
                continue
            run.append(token)
        if len(run) > best_len:
            best_len, best = len(run), " ".join(run)
    return best_len, best


def check_sentence(number: int, sentence: str, findings: list[Finding]) -> None:
    words = word_count(sentence)
    procedural = bool(IMPERATIVE_START.match(sentence))
    limit = PROCEDURAL_WORD_LIMIT if procedural else DESCRIPTIVE_WORD_LIMIT
    kind = "procedural" if procedural else "descriptive"
    if words > limit:
        findings.append(
            Finding(number, "sentence-length", f"{words} words in a {kind} sentence (limit {limit})")
        )

    cluster_len, cluster = longest_noun_cluster(sentence)
    if cluster_len > NOUN_CLUSTER_LIMIT:
        findings.append(
            Finding(number, "noun-cluster", f"{cluster_len} nouns in a row: '{cluster}'")
        )

    lowered = sentence.lower()
    for pattern, advice in NOT_APPROVED.items():
        match = re.search(rf"\b({pattern})\b", lowered)
        if match:
            findings.append(
                Finding(number, "word", f"'{match.group(1)}' -> {advice}")
            )

    if PASSIVE.search(sentence):
        findings.append(Finding(number, "passive", "possible passive voice; name the actor"))
    if PROGRESSIVE_OR_PERFECT.search(sentence):
        findings.append(Finding(number, "tense", "possible perfect or progressive tense; use a simple tense"))
    if CONTRACTION.search(sentence):
        findings.append(Finding(number, "contraction", "write the full form"))
    if re.search(r";", sentence):
        findings.append(Finding(number, "punctuation", "semicolon; write two sentences"))
    if re.search(r"[A-Za-z]\s?/\s?[A-Za-z]", sentence):
        findings.append(Finding(number, "punctuation", "slash between words; write 'or' or 'and'"))
    if re.search(r"\b(and|or)\s+then\b", lowered):
        findings.append(Finding(number, "instruction", "two actions in one sentence; split the step"))


def check_file(path: str, max_findings: int) -> int:
    try:
        with open(path, encoding="utf-8") as handle:
            lines = handle.read().splitlines()
    except OSError as error:
        print(f"{path}: cannot read: {error}", file=sys.stderr)
        return 2

    findings: list[Finding] = []
    pairs = prose_lines(lines)

    for number, text in pairs:
        for sentence in sentences_of(text):
            check_sentence(number, sentence, findings)

    # Paragraph length: consecutive prose lines separated by a blank line.
    paragraph: list[tuple[int, str]] = []
    blocks: list[list[tuple[int, str]]] = []
    previous = None
    for number, text in pairs:
        if previous is not None and number != previous + 1:
            blocks.append(paragraph)
            paragraph = []
        paragraph.append((number, text))
        previous = number
    if paragraph:
        blocks.append(paragraph)

    for block in blocks:
        count = sum(len(sentences_of(text)) for _, text in block)
        if count > PARAGRAPH_SENTENCE_LIMIT and len(block) <= 2:
            findings.append(
                Finding(block[0][0], "paragraph", f"{count} sentences in one paragraph (limit {PARAGRAPH_SENTENCE_LIMIT})")
            )

    findings.sort(key=lambda item: (item.line, item.kind))

    if not findings:
        print(f"{path}: OK")
        return 0

    print(f"{path}: {len(findings)} finding(s)")
    for finding in findings[:max_findings]:
        print(f"  {path}:{finding.line}: [{finding.kind}] {finding.detail}")
    if len(findings) > max_findings:
        print(f"  ... {len(findings) - max_findings} more; raise --max-findings to see them")
    return 1


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("files", nargs="+", help="Markdown files to check")
    parser.add_argument(
        "--max-findings", type=int, default=60, help="findings printed per file (default 60)"
    )
    args = parser.parse_args()

    status = 0
    for path in args.files:
        result = check_file(path, args.max_findings)
        status = max(status, result)
    return status


if __name__ == "__main__":
    sys.exit(main())
