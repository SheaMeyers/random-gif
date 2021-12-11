import "../css/DisplayGif.css";

interface Props {
    src: string;
    url: string;
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
          <br/><br/>
          <div className="Gif-Info">
            <div className="Gif-Info__Title-and-Rating">
              <p className="Gif-Info__Title">{props.title}</p>
              <a href={props.url}>{props.url}</a>
            </div>
            <div className="Gif-Info__Rating">
              <b>{props.rating.toUpperCase()}</b>
            </div>
          </div>
        </>
    )
}

export default DisplayGif;
