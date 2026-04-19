import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = '#815ef8',
  speed = '6s',
  thickness = 1,
  children,
  style,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        paddingTop: `${thickness}px`,
        paddingBottom: `${thickness}px`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${color}88 20%, transparent 60%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${color}88 20%, transparent 60%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
