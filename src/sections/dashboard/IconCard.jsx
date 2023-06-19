import React from "react";
import { Stack } from "react-bootstrap";
import "./icon-card.scss";

const IconCard = ({ title, subtitle, icon, ...props }) => {
  let Icon = icon;
  return (
    <Stack
      className="icon-card align-items-center justify-content-center"
      style={{
        "--bg": props.backgroundColor ? props.backgroundColor : "var(--blue)",
      }}
    >
      <span className="circle"></span>
      <span className="circle"></span>
      {icon && (
        <div className="icon">
          <Icon />
        </div>
      )}
      {title && <p className="title">{title}</p>}
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </Stack>
  );
};

export default IconCard;