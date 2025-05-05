import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'fill' | 'stroke'> {
  /**
   * @default "currentColor"
   */
  fill?: keyof DefaultTheme['colors'] | (string & {});
  stroke?: keyof DefaultTheme['colors'] | (string & {});
}
const SvgSquare = (
  { fill: fillProp = 'currentColor', stroke: strokeProp, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) => {
  const { colors } = useTheme();
  const fill =
    fillProp && fillProp in colors ? colors[fillProp as keyof DefaultTheme['colors']] : fillProp;
  const stroke =
    strokeProp && strokeProp in colors
      ? colors[strokeProp as keyof DefaultTheme['colors']]
      : strokeProp;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={16}
      height={16}
      fill={fill}
      stroke={stroke}
      ref={ref}
      {...props}
    >
      <rect width="100%" height="100%" fill="blue" />
    </svg>
  );
};
const ForwardRef = forwardRef(SvgSquare);
export default ForwardRef;
