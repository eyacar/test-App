import { useEffect, useState } from "react";
import StarIcon from "@material-ui/icons/Star";
import { amber } from "@material-ui/core/colors";

export default function StarModal({ stars }: { stars: number }) {
  const [star, setStar] = useState<number[]>([1, 2, 3, 4, 5]);

  useEffect(() => {
    let amount: number[] = [];
    let i: number;
    for (i = 0; i < stars; i++) {
      amount.push(i);
    }
    return setStar(amount);
  }, [stars]);
  return (
    <div style={{ color: amber["A400"], borderRight: "1px solid #cbcaca" }}>
      {star.map((i) => (
        <StarIcon style={{ fontSize: "1rem", margin: "5px 2px" }} key={i} />
      ))}
    </div>
  );
}
