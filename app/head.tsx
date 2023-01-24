const Head = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>Webgam</title>
      <meta
        name="description"
        content="Build your own interactive, creative web games and pages"
      />
    </>
  );
};

export default Head;
