import type { AnyComponentDoc } from '../playground/types';
import { accordionDoc } from './accordion.docs';
import { alertDoc } from './alert.docs';
import { avatarDoc } from './avatar.docs';
import { badgeDoc } from './badge.docs';
import { breadcrumbsDoc } from './breadcrumbs.docs';
import { buttonDoc } from './button.docs';
import { calendarDoc } from './calendar.docs';
import { cardDoc } from './card.docs';
import { carouselDoc } from './carousel.docs';
import { checkboxDoc } from './checkbox.docs';
import { codeBlockDoc } from './code-block.docs';
import { dialogDoc } from './dialog.docs';
import { drawerDoc } from './drawer.docs';
import { fieldDoc } from './field.docs';
import { fileInputDoc } from './file-input.docs';
import { filterDoc } from './filter.docs';
import { floatingActionButtonDoc } from './floating-action-button.docs';
import { iconButtonDoc } from './icon-button.docs';
import { indicatorDoc } from './indicator.docs';
import { linkDoc } from './link.docs';
import { listItemDoc } from './list-item.docs';
import { megamenuDoc } from './megamenu.docs';
import { menuDoc } from './menu.docs';
import { navbarDoc } from './navbar.docs';
import { otpInputDoc } from './otp-input.docs';
import { paginationDoc } from './pagination.docs';
import { popoverDoc } from './popover.docs';
import { progressDoc } from './progress.docs';
import { radialProgressDoc } from './radial-progress.docs';
import { radioGroupDoc } from './radio-group.docs';
import { rangeSliderDoc } from './range-slider.docs';
import { ratingDoc } from './rating.docs';
import { selectDoc } from './select.docs';
import { separatorDoc } from './separator.docs';
import { skeletonDoc } from './skeleton.docs';
import { spinnerDoc } from './spinner.docs';
import { stackDoc } from './stack.docs';
import { statusDoc } from './status.docs';
import { stepsDoc } from './steps.docs';
import { switchDoc } from './switch.docs';
import { tableDoc } from './table.docs';
import { tabsDoc } from './tabs.docs';
import { textFieldDoc } from './text-field.docs';
import { textareaDoc } from './textarea.docs';
import { timelineDoc } from './timeline.docs';
import { toastDoc } from './toast.docs';
import { toolbarDoc } from './toolbar.docs';
import { tooltipDoc } from './tooltip.docs';
import { themeControllerDoc } from './theme-controller.docs';
import { accessibilityControllerDoc } from './accessibility-controller.docs';
import { validatorDoc } from './validator.docs';
import { chartDocs } from './charts-registry';

export const componentRegistry: AnyComponentDoc[] = [
  buttonDoc,
  iconButtonDoc,
  linkDoc,
  floatingActionButtonDoc,
  avatarDoc,
  badgeDoc,
  codeBlockDoc,
  separatorDoc,
  spinnerDoc,
  skeletonDoc,
  statusDoc,
  progressDoc,
  radialProgressDoc,
  indicatorDoc,
  alertDoc,
  toastDoc,
  stackDoc,
  cardDoc,
  listItemDoc,
  toolbarDoc,
  tableDoc,
  timelineDoc,
  carouselDoc,
  breadcrumbsDoc,
  navbarDoc,
  paginationDoc,
  stepsDoc,
  megamenuDoc,
  fieldDoc,
  textFieldDoc,
  textareaDoc,
  checkboxDoc,
  radioGroupDoc,
  switchDoc,
  selectDoc,
  calendarDoc,
  fileInputDoc,
  filterDoc,
  otpInputDoc,
  rangeSliderDoc,
  ratingDoc,
  validatorDoc,
  accordionDoc,
  dialogDoc,
  drawerDoc,
  popoverDoc,
  tooltipDoc,
  menuDoc,
  tabsDoc,
  themeControllerDoc,
  accessibilityControllerDoc,
  ...chartDocs,
];

export const componentBySlug = new Map(
  componentRegistry.map((doc) => [doc.slug, doc]),
);

export const FOUNDATION_NAV = [
  { slug: 'colors', name: 'Colors', path: '/foundations/colors' },
  { slug: 'sizes', name: 'Sizes', path: '/foundations/sizes' },
  { slug: 'typography', name: 'Typography', path: '/foundations/typography' },
  { slug: 'motion', name: 'Motion', path: '/foundations/motion' },
  { slug: 'elevation', name: 'Elevation', path: '/foundations/elevation' },
] as const;

export function getNavGroups(): Array<{ category: string; items: Array<{ slug: string; name: string; path: string }> }> {
  return getComponentGroups().map(({ category, docs }) => ({
    category,
    items: docs.map((doc) => ({
      slug: doc.slug,
      name: doc.name,
      path: `/components/${doc.slug}`,
    })),
  }));
}

export function getComponentGroups(): Array<{ category: string; docs: AnyComponentDoc[] }> {
  const groups = new Map<string, AnyComponentDoc[]>();

  for (const doc of componentRegistry) {
    const docs = groups.get(doc.category) ?? [];
    docs.push(doc);
    groups.set(doc.category, docs);
  }

  return Array.from(groups.entries()).map(([category, docs]) => ({
    category,
    docs: docs.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}
