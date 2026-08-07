import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { searchIcon, textControl } from './shared-controls';

export const tooltipDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays',
    summary: 'Contextual hint on hover or focus.',
    importPath: '@z-ux/ui/tooltip',
    componentName: 'Tooltip',
    controls: {
      content: textControl('content', 'Search'),
    },
    render: (props) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton aria-label="Search" variant="ghost" size="sm">
              {searchIcon}
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>{props.content as string}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    code: (props) => `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <IconButton aria-label="Search" variant="ghost" size="sm">{/* icon */}</IconButton>
    </TooltipTrigger>
    <TooltipContent>${props.content}</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    whenToUsePreviews: {
      use: () => (
        <TooltipProvider>
          <Tooltip defaultOpen>
            <TooltipTrigger asChild>
              <IconButton aria-label="Search" variant="ghost" size="sm">
                {searchIcon}
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>Search</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      doNotUse: () => (
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              ?
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            Shipping is free on orders over $50. Returns are accepted within 30 days of delivery.
          </PopoverContent>
        </Popover>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Icon hint',
      description: 'Short hint on hover for an icon button.',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><IconButton aria-label="Search" variant="ghost" size="sm">{/* icon */}</IconButton></TooltipTrigger>
    <TooltipContent>Search</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: () => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton aria-label="Search" variant="ghost" size="sm">
                {searchIcon}
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>Search</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      label: 'Truncated label',
      description: 'Reveal full text for a truncated table cell.',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><span>Quarterly revenue...</span></TooltipTrigger>
    <TooltipContent>Quarterly revenue report Q3 2025</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: () => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>Quarterly revenue...</span>
            </TooltipTrigger>
            <TooltipContent>Quarterly revenue report Q3 2025</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      label: 'Disabled control',
      description: 'Explain why an action is unavailable.',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><span><Button disabled>Publish</Button></span></TooltipTrigger>
    <TooltipContent>Upgrade to publish</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: () => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button disabled>Publish</Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>Upgrade to publish</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ];
  return doc;
})();
