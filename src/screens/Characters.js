import React, { useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import Masonry from "react-masonry-css";
import { Text as T } from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import supercellLogo from "../assets/supercelllogo.png";
import {
  faDownload,
  faHeart,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

import bg from "../assets/Rectangle.png";
import background from "../assets/bgs.png";
import { H1, H2, BigInput } from "../ui/atoms";
import giphy from "../assets/giphy-4.gif";
import giphy2 from "../assets/portaits.png";
import giphy3 from "../assets/spike.jpg";
import pass from "../assets/brawl_pass.png";
import colt from "../assets/Colt-4.png";
import emotes from "../assets/download.jpeg";
import starforce from "../assets/36v08htum8d61.png";
import mapbanners from "../assets/mapbanners.png";
import bit from "../assets/portrait_8bit.png";
import amber from "../assets/portrait_amber.png";
import barely from "../assets/portrait_barley.png";
import bea from "../assets/portrait_bea.png";
import bibi from "../assets/portrait_bibi.png";
import carl from "../assets/portrait_carl.png";

import bit2 from "../assets/8Bit-11.png";
import amber2 from "../assets/Amber-41.png";
import barley2 from "../assets/Barley-9.png";
import barley3 from "../assets/Barley-14.png";
import carl2 from "../assets/Carl-7.png";
import dog from "../assets/36v08htum8d61.png";
import shelly from "../assets/shelly-fighter-brawl-stars.jpg";

const Grid = styled.div`
  width: 100%;
  display: grid;
  margin-top: 24px;
  grid-template-columns: 1fr 1fr 1fr;

  grid-gap: 24px;
`;

const data = [
  { name: "Characters", asset: colt },
  { name: "Pins", asset: giphy },
  { name: "Backgrounds", asset: background },
  { name: "Portraits", asset: giphy2 },
  { name: "Game UI", asset: pass },
  { name: "Latest", asset: starforce },
  { name: "3D Models", asset: giphy3 },
  { name: "Map Banners", asset: mapbanners }
];

const Text = styled.p`
  margin: 0;
  font-family: SupercellText Bold;
  font-size: 18px;
`;

const tags = [
  {
    name: "8bit",
    image: bit
  },
  {
    name: "Amber",
    image: amber
  },
  {
    name: "Barley",
    image: barely
  },
  {
    name: "Bea",
    image: bea
  },
  {
    name: "Bibi",
    image: bibi
  }
];

const assets = [
  { name: "Colt", asset: colt },
  { name: "Carl", asset: carl2 },
  { name: "Sandy", asset: "https://pbs.twimg.com/media/EymOY8GW8AQaIRI.jpg" },
  {
    name: "spike",
    asset:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUPEhIVFRUXFxcVFRUYFxUVFRcVFRcWGBYVFRUYHSggGBolHRcXITEiJSkrLjAuFx8zODMtNygtLi0BCgoKDg0OGhAQGy0lICUtLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAN8A4gMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCAQj/xABPEAABAwIDBQQFBwgHBAsAAAABAAIDBBEFEiEGEzFBUSJhcYEHFDKRoSMzQlJysdEVNENiksHh8HOCg5OywtMkRLPDF0VTVGN0daKj0vH/xAAbAQABBQEBAAAAAAAAAAAAAAAAAgMEBQYBB//EAD4RAAEDAgMFBQYDBgYDAAAAAAEAAgMEEQUhMRJBUWGhcYGRsdEGEzLB4fAiQlIUFSNicrIkNXOis9IlMzT/2gAMAwEAAhEDEQA/ANxQhCEIQhCEIQhCEIQhCEIQhRO02NMoqaSrkBcGAWa32nucQ1jG95c4DzQhSyFh2MYpWVTnes1L2sv+bwOdFE0fVc9tny95JAvwHBM6em3ZzQT1MLurJ5Tfuc15c1w7iFDdWxA2Fzz+z8lcMwOpc3aNhyJz6Ajqt9WbbWbevc51LQWuCWyVbheONw0LYWn52QEHX2Rbmq/Vbb4iymfSOyyvk7Eda0Bjo2uPaMsQsM4bmyubYXy3F+MBSlsbGxsFmtFgO4Imqhsj3ep6ffPwS6DCHPlIqAQBu4nt4W1I7NU6lot7rPPUzm+YGSolNnDUFoDgGkHhYaclJYZjuI0ltzVGdn/ZVV5OJucs4tI3TQXzDuUUKhdCoUBssrTcOPmtG/DaWRtiwDsFj4ha9sdtNHXwmRrTHKx2SeEm7o5ONr/SYRq1w0I7wQLCsCo3yNl38E8lPLlylzMhDmg3AkY9pD7cvEq7bEbYVL6htDWOjkMjHGGdrN2XPjF3xyMBLcxbdwIt7LtFZRVLJLN0PD66LKV2FTU207Vg3+VwtHQhCkqsQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQsv9LmKXkgohwYPXZOOuR2SBh7i8k/2a1BYT6SZnjEqtr+bKZsf9Fu5C7/5M3wTcvwFTKBgfUNB7fAX+SiI6klOo51AQVCexzKrdGtpFNkpCsm7B8vvUe2Zdyvu0jqCopkyGMyXZHjaBUqJ0CZMGyroSruylh6lqSbteS9xGocxonjNnwOE8Z6Pi7WvUEAtI6EplSP1JXGMS/IyAcS0tHi45B96S1v4wRySZ3NMTg7Sxv2WX0hQ1G8jZJa2drX26ZgDb4pwkqeIMY1g4NAaPACyVVyvPQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhYp6b6F0dVBWWIjki3BdbsiWNznsBPIlr3W65D0W1qJ2lgpZKaSOt3fq5baQyENaByOYkZSDYgjUG1tVwi4snIZDFIHjcvmUP5pzDUKTotjpp5XilcX0gN4auZroc7DYjskBzyNRmaLG19L2VsoNh6SP51z5zz1yR+Qacx/a8lTVFbBES0m5G4Z/Qd5V4cUgjAdfPhbP0HeQqYyQ8OfTn7k3/ACLUlxEcEzgToRG8i3jlsFrdLTxxi0ccbB/4bA33kanzTkOKq3Ys4fAzxP0Hmos2OucLMZbtPyAHmVlEWy9af93d55R95Xbtl60foD72H7itYaV2E1+9pv0t6+qZGOVHBv8Au/7LLvyHUxtsYH95Ech+4Fe7HU0FTiEcNTLHHHCRK6ORwY6WX9FE1riM1j2iNdABzWohNq/D4p25ZomSDo9rX28LjROQ4yWOu9gPYbeqJ8almjMZaBfW1/vqtAQsupqCpo+1h9Q5rB/usxdLTEC/ZYT24ePFpI4aK2bM7Wx1TjTyMdT1TRmfTyEE2+vE8dmZnHtN8wFo6SvhqvgOfA5H6911WhwKsqEIUxKQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhChNqMdbRw7zI6WR7hFBC22aWV18rQTo0aElx4BpOvA8JAFyhcbTbSMpA1gY6aokuIKdls8jhzJOjIxxc86AdToqtJhTpHCpxORtRKNY4AP8AZYDb9HGfnH6ntvuelrJzh1GaZr6qpeJKuaxmkF7Dm2GG/sxN4Ac7XOpUfUVTnm5KyVdib6klkRszjoXeg5ePBNvfbJuvHgndTVl/E6dEmHJpn5JQOVaGAaJlOA5KtcmjSlWuSSF0J01yVa5NGuSocmyFxObrlrkkHLjP2vFJ2UJy4qMxfC46hoa/M1zTmjlYSyWJ/J8Txq0/yU8JSbilsJadoGxCE+2S2mkMgw+uLfWLEwzNGWOqY0Xc4DgyUDVzPMacLmsvxbD2TsyOu0hwfHI3R8UjDdkjDycD+8c1I4R6RYIoTHiUrYamJwjeA1zjMCLsnijYCSxw1Nh2SCDbRbHDcQ/aW7L/AIxrzHH18dE+x19Vf0KD2d2roq7N6rO2Qs9ptnMe0HmWPAdbvspxWiWhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhZ5Rzeu1kmIu+Zp95TUYNtXA5ampHTM5u7GvssPVWLbrFX01FK+L55+WGDrvp3COMi/Quzf1Sq+YG0dHHTR8I2NjB6kDVx7ybnxKo8cqC2JsLdX69g9Tl2XSJH7AuNUzxWu3j7DgEzD01a5D3aKiDABYKOBZO4n812HpuxdgpJCLpwHqOxnH46cW9p5Fw29rDq48gla2qEcbpD9EXt1PIe9ZNidc6Z7iTe5ue89fDopVHSe+cSdAujNWSq25mJ7L8vcxgI97r3TnDdvJAQHkPHRwDHeTm6KlBq8LFamigIts/fmlbIW44Zisc7M7D3EH2mnoQnEsnA96yXZDGXQTNBPZPZP2f4cR4FapLwVHVUpgktuOYSDkne8VD2r2teyQxROytactxbM5w468gDorkx2gKxTE3l0ziev8T8Sn8Op2yPO0NAujNXDAduXZgycktOmYgZh33HteHFTG2OHNmh9ZYAXsbcOH0ouJF+YHtDz6rLi1X/0fYsXsdTPNyzVt+bDxHkfvUuppxCRPENDmFx7AWkKQ9CUL318s7Wkxsp3RPf9HO6SNzGd5sxx7vMLcVnnomkbCKrDcobuZd9GQAM0NRqLni4tc17bnkGjktDWhhc10bS3QhPxMDGBoQhCE6nEIQhCEIQhCEIQhCEIQhCEJpX18MDN7PLHEwEAvke1jbngMziBdO1gPpmqZ3YhuZ/mWMa6lbbsFrgBI89X5wW9wDetzxxsLpEj9hpcrrtNjtLXVdBTU00U7Y5ZKqUxua8M3EZEVyOr5Rb7PckdqKjtNb4lU/0UxA1EsgA7MOX9t7T/AJE426bLJJ8nrlOrQbE3AsRfQ21581l63+NX7JNrADpf5qA+YyEEDuT9pXr3agKB2bbOM4lDg3TKHHnre3dwUw13b8AmJWbDy29+YTrTcXKe5l2HJuCugVHXUx2pJ9VltyAPucCssYthkY1zS12oIII7jxWX43hL6WTIblh1Y/k4f/YcwrXDXjOPfqOaWy2iaAr1JNcui5WSWF6x1nNI6hbbE7sgHjYX8bLK9j8HM8wkI+SjIc48i4atjHU3sT3eIWoAqmxN7S9rBqNe9NvOaUidosl2npDDVSN5E52/Zdw/DyWrMKr22OBGpYHxj5Vl7D67Txjv15j+KYopmxS3docj6rjTnms5UnsnUmOsiI+kTGfBwI++yiSSCWkEEaEEEEEcQQeBUpsnTGSrjtwYTI49A0afGwV3UACJ9+B8vVOFahRVXq+I0dSDYSONHL3tmuYr+ErW/tHqtcWJbSRudTSFhIewb2MjiJIiJGEd92hbDhVa2eCKob7MsbJW/ZkaHD4FGDy7UBZ+k9Dn53SoTdtk8QhCtk6hCEIQhCEIQhCEIQhCEIQhZl6WK6nlMdAaaKonsZM8mfJTRni4ujc1+Z+WwaHD2bnQC+j1VQ2NjpXmzWNL3Ho1oJJ9wXyvLj1RNJLNmOaeQyvHtE3PZZmOuVrbNA5AaKXRQNmls69hrbyUilYx0n8S9hrbfy9TwVi2LqmYe6a7zJvMgBsWhoYX6C7nE3zfBS0tWJXl7ba8zYfvVZqKSRgbvY3RlwuA4EaefBIQ1Tmd46clYS+z2GVV5WAgu/M1xN92hLm2y3AdoU52HUkg2mi194JPQkjyPNXGN69hd2iouhxEOGuvQ8SPMmye0j7lx71iMUwefD3WkzadHDQ8uR5HuJVPVUclO78WYOh3H0PI9dVIAr0FIApUFU6iJUFcVFOyRpjkaHtPEEXHj3HvXgK7BSOa4q5U7DwON2SSR9xs8DwvY/Fe0uw8DTeSSSQdNGA+NtfiFZAVUNqMdNzG09kEiw+kRxueilxSVEp2GvP3z16pe04qysxKlhAia9jWt0DWgkD9kFOafEYn+xI0npex9x1WTurZDwNvAfiumVzxxsf57k+cMy1zXSwrX7pjVYxBHo6QX6N7R+HBZu7GHEZTmPcXHKmslY88NPD8UlmGn8x++q5sFaFLDQ1p7TAX9e1HLYd4tm+KkcOw2GAFsLA2/E3JcbcLuOpWXUle+NwdmOhvfmO8FadhtZvYmydRr4jQpqqp3wgDaJbwvl4adFx1wncgBBB4EWPmp70ZbUwGngw2WTd1ULNzu33bvBHdrXRE6PGUDQaix0VeJVaxqISPe0kizyWke0xwccr2kcCLg3V57M0f7U6Zt7EBpHDU69FNw+n9+5zQbG1xw1+q+iEKs+j/ABx1ZRRzSW3rS6Oa1rb2M5XEW4XsHW/WVmViQQbFcIsbFCEIXEIQhCEIQhNMTrWwQyVDwS2Jj5HAWuWsaXEC+l7BCE7Qsdo/TS8ua+WgtCbEmOXPK0HXNlc1odyFrjmrRjO27JWNhw6RkkskYkdPbNFSxP4SSNPGU6hsR1JHasBq1JPHGwvcQANSkte12hSvpAxgOilwyEB880T2yXNmU8UjS3eyuANjr2W8XHuVTwLZ6GlaN2Mz7AOlcO0fscd2O4a9SU7oaVsYLWlzszi98jzmkleeMkrubvgBoE8aslXYrLPeNpIYd3H+q39unG5CbdIdBoovaeg3tO6w1beQf1RqP2b+4LNiLrWpnrKsUg3c0kYuAHvA/aI/cFsPYirLopaV35SHDsdk4dxAPa5WeFy3Do+8eR+SbNkcw3H8CrDhlfcA8j55SbcAq4UrRz5Hdx4/itxJFHMwxTDaa7Ij70I1BGYOYKuLMcDHILtOoV3Y6+qUBUbh9RcZTxGvjwFv57+qfBy8nxXDn0FS6B2Y1aeLToe3UH+YG2VllaumdTymM9x4jcfvenAK9BSQcvQ5VijJcFZPiDiZHX8P5961MOWe7V0BinL7diTtNPK/Nvip+HECQg7x5JbNVFBe2C4BXStU4dV7lXuVcIuhcQ9aBsU4+qtv9ZwHgLBZ84rTMEpTDBHEeIbd32nauHvNvJQcRcPdhu8lcfopK6r+KNtJcc2h/m7/APFN5lA4m/t/1W/efxVt7F7X7weL5e6d/fHZWOCH/En+k+YV79C8357DpYSxS8dbywsBuP7NaasTwWlkbHHWUrhHUxksBN93MyzSYZ2j2mHrxabELjGfSniBlLY4YqUN0McgMshdzzOBa0DhYAealVVTGayePQtebjlfIjkb92/m1WysZNJc2/EfNbehVrYHH319EypkaxsmZ7Hhl8uaN5bcA6gGwNjfirKuJAN0IQhCEJKaIPaWOF2uBaQeBBFiClVG4/i0dJTy1Ut8kbS4gWu48Gsbfi5ziGjvIQhYPtFsJLT1xoqWRkkZaZhmc4Gnj5NnIadCdGkXJtwVrwihZBE2CMANGriGhpkkPtSOHMngL3sAAuqVkjGvfN+c1L9/Un6tx8nAD9WNlm+R6pdixmIVv7S/8PwA5c/5j26jgM9SVFcGhxLUu1eucuWrx5VYkpKd6oG00Vps31g13vFv3K7zOVL2v+db9gf43rYex5IryBvY4dWn5KbhziJwOIPr8lDLhwXa8K9NWi3KVw+p9l/PgfI3/d8VYY3CwtzGb3qnUbuI81Z6B92A+XkGj8Ss17XUolpI6katOyebXfUDxKgYvHtwMl3g2PYfQjqU+BXockQV0CvO7LOpYOSVbSMmYYpBdp8iDyc08iF6CvbrmmYReypGJbLzxElg3rORb7Vu9nG/hdQryWnK4Fp6EWPuK1Nrl692bRwDvEA/epzMQkA/EAeen08k6JOKynOErTxvkOWNjnno0F3vtwWkepwXuKeK/Xdsv9ydB9hYaDoNB8Eo4ibZM6/RHvBuVa2e2YMbhPUWzDVkehDTydIRoSOQHirMXLi68uoUkj5HbTj98k05xJXeZV/EnfKH7LfuKnbqvYo7tg/qj7lqvYr/ADCT/Sd/fErbBP8A6D/SfNqt2zEn+zj+kP8AgYmW2mCGeIywgb9g7P67Rruz38x7udx7spJ8lb9f/KPwVhBWf9oXuhxqdzNQ4Hxa1RcQb/iZAeP1Vo9HFJTxYfTimeZI3t3hkPF8j9ZHOFzlOa4y8rW5KzrM/R9WerVk2HuJ3dRepphfstkb+cxC50vdsgAFrFy0xaCCZs0bZG6H7PgV0G4uhCEJ5dQs82vrRUVrafjDRNbUzDk6peD6vGfstvJ4uYrvilcynhlqJDZkbHSO+yxpcbd+iyikEjKWMy/P1DnVdQeHbl1DbHgGtytA5ZFUYzOWQe7bq/Lu/N0y70iR1glTKXEuPEm580uwpowpwwrKuAUa6cgpORy9BSUzkgC5XE1ncqXtRJeQDo1rfi4/grbVPsCVRsYlDpCQdLAX8Br8brZ+x8JdWOktk1h8SRbpteBU7C23nvwB9PVNmFepJdtK9JstEuoDZyncIk0Pdr91/vCr4PaUphjva/n6qrMaaH4bM08L+BBHVR63OjeDy8wp8OXQco5ktku2deWOYsongcug5NRKug9I2UZpzdGZIZ17vFzZXM0oHarvMmUMmpSudBajNL5kFybl6TfLZdDUJeWWwUHirvlD/P0k8ll5qNxN3aJ7/wB5W39io7TTu4Mt4n6K4wX/ANzjy+Y9FO7Iy9l4/WB94/grUxyrWwsYdDU34h0bgemkl/eFPQvWW9qhfFpz/R/xRpGKNIqS7jY9LfJNcdD2sbUwj5aneJ4uOpZ7UZtyezM23etZwyvZUQx1ERuyVjZGH9V4BFxyOvBZoSpj0VVWVlTh5/QS54hawFPUXkYB1s/et04WCMCqPihPaPI/LqosTtyv6EIWjTypXpMdnhgoBb/aqhkbxex3EV5pbczcRhp+2qrilRnmceQOUeA/kqZ2oqs+Kci2jo3Ov0lqn8O7sQ/+5VqM81lMVl95Vlv6Wgd5zPTZ8FGlN324fNOGlLMKQCA9VhF0hPA5IzOXLZFzJcpDQuKGx+pyRE8zdo8wSqXdWDbA+wO8n7lXF6r7LU4jw9rxq8lx7iWjo2/aSr3DGBsO1xJ6G332rpegrkFeuWjurIFeA6qTw86Hz+9qiXGymKWBwYCBx149QFSY/UiKicze4hvW56AqJXbboHMYCSbaZ7wfknQeug9IZHfV+4ouei89ss06CQatI7QQnYkXQmTHfhdCYdUksKa2hxT8TodPomO+715NNoubF0BPKaXRKGdR8clgvd+gszQSLp26ZJmRIi54D9y6ELj3eP8ABFgE/HSzSfCwnuy8SvZDmBUdWv4n9b96kJAxg7TvL+Ci8Q0afEfet/7I+6FNUObfbyvllaxtY8db35LRYbSOp43F/wAR6AadVbvRzIN1VDru/wDDIpOnkVU2Jq8u9H1sg8xmP71aoY7rDe0g/wDKTu47HSNgVfikjXPaBqL37/u/enOdK7MS7vFYCDbfwzQuF/a3dpWacyLP8iU0k0RhsgbX4e86fLvZy4yU87QNe9V+Gu2Kph528QQq9nxBbGhCFs1KWQVtQHT4pOPp1QgJ/wDLwRMI9+Ye9MYUhirzBNWUhIu2ullJ5llQxszL9T2yL9yb0tXfRY6pjeZpXO3uPhoOgULPacTxU0wJKay6hOij8fqdzE+bUhouQOPRRI27Tw0arhKexyC9rp4QLKt0LKiOeaGcMDoxHmyPL2tfIzPu82UAua0tvlJFyNVOsk0S6mndE/YOoSiLZKq7bD5s97lWLq2bafNNNiTvA1oAJJLmuAAA1JJAVSc0tOVzHsIANntcw2NwCA4C40OvcvSvZ2tibhsYe4DZ2hmR+okeau8Plb7kNJzF/O/zXuZcTTBo7+QXLnHlp5XSbYxe51Pf+CmVOMwMBDDtHkpjpeC7gBd2inbJ3jg4+9Nt4ut6FlaupkqXXf3Dh9eaQHc0+biEo+lfyCUbi0nQe7+KjRIF2JAoRib+lOiQ7ipMYy/mB8QuhjA5s+KixIEbxIMDOCV75x3qZbikZ0yEX04BNZHcG6KNLyDcKQhxuws5t/A2XDDs/AL96iVVM2ptd2za+69794+ylw4izui7fjP1W+8qOqcQc/QAAJBslke5uPxBPU7W07NiMqSfich4ADy/FN31Eh4vP8+CbGcLhspdwCWIgNAEsyEp7Tt7V+Ka43NYMaOJObyGn8+CtuxGxU2IxzPbVinbE8R/MiXMcge43Lxa2YKLpMEjyPkc7f3mfupSC0Phj7LZMgcQA5wNgb6N71qafFaagw4RWcXPOZAG/cM9zRy378lEnr44mFtje9l7smwtZc/Sfbyyty/5lcqV6rEVmADhqy3lcAe5x9ynqSRYXEZDNK6U7z9+GioC8vc5x3lPas8CmddJk3E2o3VTTSm1+AmaHcOWVxv3XTmQ3aQo3aS4pJnN4tbnHDiwhw4+ChUrg2WMnc4eYXW/EFu6EmHg6oW6sVMWQelOhyYi2UaCemv4yUz7Hx7Eo/ZVfbGGlrgOPFaR6VsIdLTMrIm5pKVzpMtrl8D2llQxuuhy9r+ztZZvDUCSMFpvazm94t+Cz+JRubLt7j56HpY+PBRpQQ66mad6MRp2yxvjdwc0tPg4WKj6WquE9FQLKkLHNdcJtyisMu0Br3533c+Z1rZp3uOY+AAY0dzQpQSKBrjUGoDaeF0xdG55Yyxk+StmIb9PR0eg105pSkqKqV+5io6h8nDLunst9tzwGsHeSp7qSab+IBfaue8nPrdKa0kXUpAx01ZRU7BdzqmOU8ezHTuEr3e5oHi4KX9M+zxfPTVbXAb0to3A34neSRv08Hg+IU96P9jZqeV1dWFu/dHumRMOZsUZcHOu/wClISBcjQAW1ulPSx7FB/6jB/wp1cMhNNRO4gE99svCwT13RRlzdQCeiw8UEg+jfwN/gbFcuht7TSPEOA+KtMlNZ7mgcHEe4pxHSnoqw1m/6JyPFZAM2g9PUdFTPVmnh8Ckn0XQq8vwhrvajYfEBIyYE0/QA8CR8Lrra9o19VIbisR+JhHZb52VGdTOHRJPa4cQrpLs+Orh5tH3tUZW4G574qZhGaeVsDS64DTJeziRrYW6KVDVNkcGjenBXUztCQeY9Lqtb3vRvCvqCm2Iw5rGtdQ0jnBoDnerwjMQLE2y81W9v9gKT1KSakp4YJoAZ2uZG0F+6a4mJ1raOFx42VmYOC4KniFge9K6GY8lP1uFNG6ka4kSRRzDS3zjRp8VzHhjep94VcKqNzQ4b0luIUzhcOPgVDNjeeg80q2lPNyscODtP1j5t/c1PYcFb9W/jmTL61gXTiVONzj99qqzKVo1PxUhS0TnmzQQOpBa23cefkrNDhLW6tY0Hq1ov706bRFRJa4EZJiTFza0TLczn0081Y9gtnnPwGWNj7SVrJpL8A10rN2xvhlYy/iVQMGqhOMzxu2sjAewC2Td2YIQDw1FrdxWmeirG4/V2YXIclTThzcjtN7EHEsliJ9puUi9tQQbgaKA9LuA+rvbicLcsbyGVYFg3OSd1O4DndxaT+s3vV3VQCeIOYdBl2ZXt3KNOz3rbg58e3Xoq3O5j2Oblyutdtuo1AP3XXNDXiwBOqjfyk3LcEWNruuOAvoD01+ATp0gkaLWuNbG2qpXR5Wdp5KKwFqnqepDuHDqm+0Ug9WmaT7Ub2N46vcCGAAakkkCyhvy7HEO24Ntpbn4ALRPR9sm+RzMSrWWt2qSncPm+lRKD+lP0R9EfrcCmw90sg3N4+nNPMYXFaBhcrtzFnY4O3bMwPEOyi4PmhPULV7RUtCwra7ZSfDZXywxOfRlznscwZtwHXcY5GDtBjTeztRYgFbqhMyxNlbsu0XC0EWK+aGVrXdtjhr33b5EL38oSF7YIrSSvIayJpu9zjw8B1J0ABW1Yj6OsLnkdNJSNzO1dkfLE0k8SWRva0k8za55qUwTZqjo7+rU0cRPEtb2j/WOtu66gtw1t8zcdib90N6q+wOxM9LMa2rlaZTGYmRR3McbXua5xc9wu95ytGgAFjxvcaAhCsGsawbLRYJwAAWCFQfSRJmqcNg5GWeY/wBjCWg++Ue9X5VDbXZ+onkp6qmMe8gErDHJma18coZez2glrgYxbSxueCYrGPkp3sZqWkDvCRMCY3BupGSpOJPibIWxgXBOY9XHikWSLyfZTFWuLvU2vu6/ydREeOv6TJ4Lw4DijRc4dJbn8vSH/mrNHDKgADZJ8D81BbA8C1k5a9d3TUYZiH/cJf72k/1l03DcSOjaCUn+mpB/zUz+76g6MK57qTgUo+yiMapxJGWjR47UbxcOZI3Vj2kagg21Ck34Hix/6tf51FJbztIuhsdizz+bQs731At7mMJUiLDqppBDT4j1XRDJfILTtkMV9boqaqPGSJjnfbtZ4/aDkttL+Z1P9BN/w3JpsVgr6KihpJHNe9gcXltw3M97nkNvqQC61za9r2F7KaljDmljtQ4EHwIsVrArIL55qA31eksRf1WC/wDdhJwgK5zeieoAa2OuiLWNEbA+B18g9nM5smrgLagBN/8AotxAHs1NIRyJZMD7rn71n24bMxgbrbmq2OlkY0N4c+agI5LJ3FOpAejfFvrUP97Uf6K7b6P8VH0aM/28v+im34bOfy9Qle4k4JvHKE5a8Ltuw2LD6NJ/fy/6KUbsPi3SjHjPMfuhUc4VUH8vUeq5+zycFH4lSMlABLmuac0cjCWyRuHB8bxq0q+ej7H3VlM6Kps6ohcYajsgNfpdkmXhZ7CDbrm0AVWZsLipPafRNHc6d5J8MjbfFWnYXZGSidPNNKySScRBwjYWRtEWe1sziXHtnXTgFZ4ZTVFO4tePwnnv5fNSIGSMNnaJ6dhcLvf8n0t/6FlvdayiD6KcLzl5ikyk33W+lEQv0a1wIHdeyvSFcEXUlQmGbJ0FM4SQUkEbwLB7Y25x4OtcKbQhdQhCEIQv/9k="
  },
  {
    name: "8bit celebration",
    asset: bit2
  },
  {
    name: "Colonel Ruff",
    asset: dog
  },
  {
    name: "Shelly",
    asset: shelly
  },
  {
    name: "amber celebration",
    asset: amber2
  },
  {
    name: "barley celebration",
    asset: barley2
  },
  {
    name: "barley sad",
    asset: barley3
  }
];

const Overlay = styled(Box)`
  position: absolute;
  background: rgba(0, 0, 0, 0.03);
  display: none;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const Container = styled(Box)`
  position: relative;
  cursor: zoom-in;
  &:hover .overlay {
    display: block;
  }
  &:hover {
    outline: 1px solid #ddd;
  }
`;

const Button = styled(Box)`
  padding: 10px;
  border: 1px solid #eee;
  background: white;
  cursor: pointer !important;
  border-radius: 8px;
`;

const Image = ({ asset, name, ...props }) => (
  <Container {...props}>
    <img src={asset.asset} style={{ width: "100%" }} />
    <Overlay className="overlay">
      <Box style={{ position: "absolute", bottom: 10, right: 10 }}>
        <Button>
          <FontAwesomeIcon icon={faDownload} color="rgba(0,0,0,0.7)" />
        </Button>
      </Box>

      <Box style={{ position: "absolute", top: 10, right: 10 }}>
        <Button>
          <FontAwesomeIcon icon={faHeart} color="rgba(0,0,0,0.7)" />
        </Button>
      </Box>
      <Box style={{ position: "absolute", bottom: 10, left: 10 }}>
        <img
          src={supercellLogo}
          style={{ width: 30, borderRadius: 100, cursor: "pointer" }}
        />
      </Box>
    </Overlay>
  </Container>
);

const Tag = ({ name, image }) => (
  <Flex
    style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #ddd" }}
    bg="white"
    pr={3}
    alignItems="center"
    mr={2}
  >
    <Box mr={2}>
      <img
        src={image}
        style={{
          width: 50,
          height: 40,
          display: "block",
          backgroundColor: "#eee"
        }}
      />
    </Box>
    <Text>{name}</Text>
  </Flex>
);

function Home() {
  const [activeImage, setActiveImage] = useState(null);

  if (activeImage) {
    return (
      <Box flex={1} style={{ position: "relative", overflow: "hidden" }}>
        <Flex
          onClick={() => setActiveImage(null)}
          style={{
            border: "1px solid #ddd",
            position: "absolute",
            top: 18,
            left: 18,
            zIndex: 1000,
            borderRadius: 1000
          }}
          justifyContent="center"
          alignItems="center"
          width={50}
          height={50}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" color="rgba(0,0,0,0.7)" />
        </Flex>
        <Box
          width={2 / 3}
          p={3}
          height="100%"
          style={{ borderRight: "1px solid #ddd", overflow: "hidden" }}
        >
          <img
            src={activeImage}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box p={3} flex={1}>
      <Box
        p={3}
        m={-3}
        pb={6}
        mb={-6}
        //pb={4}
        //  style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <H1 style={{ fontSize: 32 }}>Characters</H1>

        <Flex mt={3} flexDirection="row">
          {tags.map(tag => (
            <Tag {...tag} />
          ))}
        </Flex>
      </Box>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {assets.map(asset => (
          <Image asset={asset} onClick={() => setActiveImage(asset.asset)} />
        ))}
      </Masonry>

      <Grid></Grid>
    </Box>
  );
}

export default Home;
