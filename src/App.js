import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player/Player";
import { connect } from "react-redux";
import * as actionTypes from "./Action/action";

const spotify = new SpotifyWebApi();
const App = (props) => {
  useEffect(() => {
    let _token;
    if (window.location.hash) {
      const hash = getTokenFromUrl();
      _token = hash.access_token;
    }

    window.location.hash = "";
    if (_token) {
      props.storingToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        props.storingUser(user);
      });
      spotify.getUserPlaylists().then((playlists) => {
        props.storingPlaylists(playlists);
        playlists?.items.map((pl) => {
          spotify.getPlaylist(pl.id).then((res) => {
            props.storingDiscoverWeekly(res);
            return null;
          });
          return null;
        });
      });
    }
  }, []);
  return (
    <div className="App">
      {props.token ? <Player spotify={spotify}></Player> : <Login></Login>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    playlists: state.playlists,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    storingUser: (user) => dispatch({ type: actionTypes.SET_USER, user: user }),
    storingToken: (token) =>
      dispatch({ type: actionTypes.SET_TOKEN, token: token }),
    storingPlaylists: (playlists) =>
      dispatch({ type: actionTypes.SET_PLAYLISTS, playlists: playlists }),
    storingDiscoverWeekly: (res) =>
      dispatch({ type: actionTypes.SET_DISCOVER_WEEKLY, discoverWeekly: res }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
