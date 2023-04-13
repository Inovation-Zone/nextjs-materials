import { Switch } from 'antd';

interface SwitchComponentProps {
  checked?: boolean;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ ...rest }) => {
  return (
    <Switch
      {...rest}
      checkedChildren="On"
      unCheckedChildren={
        <span
          style={{
            borderColor: '#f5222d',
          }}
        >
          Off
        </span>
      }
      style={{ background: '#000' }}
    />
  );
};

export default SwitchComponent;