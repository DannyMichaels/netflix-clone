import { CircularProgress } from '@material-ui/core';

interface Props {
  marginTop?: string;
  color?: string;
  thickness?: number;
  size?: string | number;
}
export const CircularProgressLoading = ({
  marginTop,
  color,
  thickness,
  size,
}: Props): JSX.Element => (
  <CircularProgress
    style={{
      marginTop: marginTop ?? '0',
      color: color ?? 'red',
    }}
    thickness={thickness ?? 1}
    size={size}
  />
);
