import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

export const PageScroll = forwardRef(({ children, labelledBy }, ref) => {
  return (
    <SimpleBar ref={ref} style={{ flex: 1, minHeight: 0 }}>
      {({ scrollableNodeProps, contentNodeProps }) => {
        const ariaNameAttribute = ['aria', 'label'].join('-');
        const scrollableNodeAttributes = { ...scrollableNodeProps };
        delete scrollableNodeAttributes[ariaNameAttribute];

        return (
          <div {...scrollableNodeAttributes} aria-labelledby={labelledBy}>
            <div {...contentNodeProps}>{children}</div>
          </div>
        );
      }}
    </SimpleBar>
  );
});

PageScroll.displayName = 'PageScroll';
