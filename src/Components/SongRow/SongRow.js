import React from "react";
import "./SongRow.css";

const SongRow = (props) => {
  return (
    <div className="songRow">
      <p>
        {props.index?.toString().length === 1
          ? `\u00A0\u00A0${props.index}`
          : props.index}
      </p>
      <img
        className="songRow__album"
        src={props.track.album.images[0].url}
        alt=""
      ></img>
      <div className="songRow__info">
        <h1>
          {props.track.name.length > 45
            ? props.track.name.substr(0, 46)
            : props.track.name}
        </h1>
        <p>
          {props.track.artists
            .map((artist) => {
              return artist.name;
            })
            .join(",")}
        </p>
      </div>

      <div className="songRow__name">
        {props.track.album.name.length > 50
          ? props.track.album.name.substr(0, 50) + "..."
          : props.track.album.name.substr(0, 50)}
      </div>
    </div>
  );
};

export default SongRow;
