import "../css/DisplayGif.css";

interface Props {
    src: string;
    title: string;
    rating: string;
}

const DisplayGif = (props: Props) => {
    return (
        <>
            <iframe
            src={props.src}
            title="random-gif"
            width="480"
            height="270"
            frameBorder="0"
          />
          <div className="Gif-Info">
            <div>
              <p>
                <b>Title</b>
              </p>
              <p>{props.title}</p>
            </div>
            <div>
              <p>
                <b>Rating</b>
              </p>
              <p>{props.rating.toUpperCase()}</p>
            </div>
          </div>
        </>
    )
}

export default DisplayGif;
