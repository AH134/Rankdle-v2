function FooterIcon({ src, link, context }) {
  return (
    <a href={link}>
      <img src={src} alt={context} width={"25px"} />
    </a>
  );
}

export default FooterIcon;
