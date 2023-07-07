import "./Card.css";
const Card = () => {
  return (
    <div className="main">
      <div className="content">
        <div className="img-t">
          <img
            src={require("./image/image-removebg-preview (4).png")}
            alt="testimonials"
          />
        </div>
        <div className="crt">
          <p className="term">Terms & Privacy Policy</p>
          <p className="copy-right">
            All rights reserved to Huddle App &copy; 2023
          </p>
        </div>
        <div className="text">
          <h4 className="card-text">Feel like you’re </h4>
          <h4 className="card-text">right there..!!</h4>
        </div>
        <div className="text-2">
          <p className="card-text1">Stay close to the people that matter</p>
          <p className="card-text1">
            to you with reliable messaging and calling{" "}
          </p>
          <p className="card-text1">across Web, iOS and Android devices ❤</p>
          <p className="card-text1">Wherever you go, you can say hi...!! 🙋‍♀️ </p>

          <img
            className="camera-icon"
            src={require("./image/camera.png")}
            alt=""
          />
        </div>
        <div className="msg-box">
          <img
            className="cat"
            src={require("./image/image-removebg-preview (5).png")}
            alt=""
          />
        </div>
        <div className="aunty-image">
          <img
            className="aunty"
            src={require("./image/313421771_662760865227418_1457196189222420488_n.png")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
