import React from "react";
import "./Body.css";
import Header from "../Header/Header";
import { connect } from "react-redux";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../SongRow/SongRow";
import * as actionTypes from "../../Action/action";

const Body = (props) => {
  return (
    <div className="body">
      <Header spotify={props.spotify}></Header>
      <div className="body__info">
        <img src={props.discoverWeekly?.images[0].url} alt=""></img>
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>
            {props.discoverWeekly?.description
              ? props.discoverWeekly?.description
              : "Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates every monday."}
          </p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        <div className="body__trackInfo">
          <h4 className="body__trackInfo__title"> # &nbsp; TITLE </h4>
          <h4 className="body__trackInfo__album">ALBUM</h4>
        </div>
        <hr />
        {props.discoverWeekly?.tracks.items.map((item, index) => {
          return (
            <SongRow
              index={index + 1}
              track={item.track}
              addedAt={item.added_at}
              key={index}
            ></SongRow>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    discoverWeekly: state.discoverWeekly,
    index: state.index,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storingIndex: () => dispatch({ type: actionTypes.SET_INDEX }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
