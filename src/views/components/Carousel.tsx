import { useEffect, useState } from "react";

interface Props {
  images: { url: string; name: string }[];
}

const Carousel = ({ images }: Props) => {
  const [image, setImage] = useState<string[]>([]);
  const [img, setImg] = useState<string>("");
  const [name, setName] = useState<string>(images[0].name);

  useEffect(() => {
    let data: string[] = [];
    images.map((image) => data.push(image.url));
    return setImage(data);
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      let index = image.indexOf(img) + 1;
      if (index < image.length) {
        setImg(image[index]);
        setName(images[index].name);
      } else {
        setImg(image[0]);
        setName(images[0].name);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [image, img, images]);

  const imgStyle = {
    width: "328px",
    height: "213px",
  };
  return (
    <div style={imgStyle}>
      <img style={imgStyle} src={img} alt={name} />{" "}
    </div>
  );
};

export default Carousel;
