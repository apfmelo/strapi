import * as React from 'react';

import {
  Accordion,
  Box,
  Button,
  Flex,
  FlexComponent,
  Modal,
  Typography,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import * as Icons from '@strapi/icons';

import { COMPONENT_ICONS, ComponentIcon } from '../../../../../components/CustomComponentIcon';
import { RESPONSIVE_CONTAINER_BREAKPOINTS } from '../../FormLayout';

interface ComponentCategoryProps {
  category: string;
  components?: Array<{
    uid: string;
    displayName: string;
    icon?: string;
  }>;
  onAddComponent: (
    componentUid: string
  ) => React.MouseEventHandler<HTMLButtonElement> & React.MouseEventHandler<HTMLDivElement>;
  variant?: Accordion.Variant;
}

const ComponentCategory = ({
  category,
  components = [],
  variant = 'primary',
  onAddComponent,
}: ComponentCategoryProps) => {
  const { formatMessage } = useIntl();

  const [isOpen, setIsOpen] = React.useState<string | null>(null);

  return (
    <Accordion.Item value={category}>
      <Accordion.Header variant={variant}>
        <Accordion.Trigger>
          {formatMessage({ id: category, defaultMessage: category })}
        </Accordion.Trigger>
      </Accordion.Header>
      <ResponsiveAccordionContent>
        <Grid paddingTop={4} paddingBottom={4} paddingLeft={3} paddingRight={3}>
          {components.map(({ uid, displayName, icon }) => {
            const Icon =
              COMPONENT_ICONS[icon as keyof typeof COMPONENT_ICONS] || COMPONENT_ICONS.dashboard;

            return (
              <Flex key={uid} direction="column" position={'relative'}>
                <ComponentBox
                  tag="button"
                  type="button"
                  background="neutral100"
                  justifyContent="center"
                  hasRadius
                  height="200px"
                  shrink={0}
                  borderColor="neutral200"
                >
                  <Flex
                    direction="column"
                    gap={1}
                    alignItems="center"
                    justifyContent="space-between"
                    height={'100%'}
                    padding={'6px'}
                  >
                    <ComponentIcon color="currentColor" background="primary200" icon={icon} />

                    <Flex width={'100%'} height={'60px'} justifyContent={'center'}>
                      <Typography variant="pi" fontWeight="bold">
                        {displayName}
                      </Typography>
                    </Flex>

                    <Flex gap={1}>
                      <Button
                        variant="default"
                        aria-label="Open icon modal"
                        size="S"
                        onClick={onAddComponent(uid)}
                      >
                        Add
                      </Button>

                      <PreviewButton
                        variant="tertiary"
                        aria-label="Open icon modal"
                        size="S"
                        onClick={() => {
                          setIsOpen(uid);
                        }}
                      >
                        <Icons.Eye width="16px" height="16px" />
                      </PreviewButton>
                    </Flex>
                  </Flex>
                </ComponentBox>

                <Modal.Root
                  key={uid}
                  open={isOpen === uid}
                  onOpenChange={() => {
                    setIsOpen(isOpen === uid ? null : uid);
                  }}
                >
                  <Modal.Content>
                    <Modal.Header>
                      <Modal.Title>{displayName} component</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Flex width={'100%'} justifyContent={'center'}>
                        <Box width={'600px'} height={'600px'}>
                          <Icon height="100%" width="100%" />
                        </Box>
                      </Flex>
                    </Modal.Body>
                  </Modal.Content>
                </Modal.Root>
              </Flex>
            );
          })}
        </Grid>
      </ResponsiveAccordionContent>
    </Accordion.Item>
  );
};

const ResponsiveAccordionContent = styled(Accordion.Content)`
  container-type: inline-size;
`;

/**
 * TODO:
 * JSDOM cannot handle container queries.
 * This is a temporary workaround so that tests do not fail in the CI when jestdom throws an error
 * for failing to parse the stylesheet.
 */
const Grid =
  process.env.NODE_ENV !== 'test'
    ? styled(Box)`
        display: grid;
        grid-template-columns: repeat(auto-fill, 100%);
        grid-gap: 4px;

        @container (min-width: ${() => RESPONSIVE_CONTAINER_BREAKPOINTS.sm}) {
          grid-template-columns: repeat(auto-fill, 14rem);
        }
      `
    : styled(Box)`
        display: grid;
        grid-template-columns: repeat(auto-fill, 100%);
        grid-gap: 4px;
      `;

const PreviewButton = styled(Button)``;

const ComponentBox = styled<FlexComponent<'button'>>(Flex)`
  color: ${({ theme }) => theme.colors.neutral600};
  /* cursor: pointer; */

  @media (prefers-reduced-motion: no-preference) {
    transition: color 120ms ${(props) => props.theme.motion.easings.easeOutQuad};
  }

  /* &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    background: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
  } */
`;

export { ComponentCategory };
export type { ComponentCategoryProps };
