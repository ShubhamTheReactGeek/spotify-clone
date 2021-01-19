import React from "react";
import "./Sidebar.css";
import SidebarOption from "../SidebarOption/SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { connect } from "react-redux";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      ></img>
      <SidebarOption title="Home" Icon={HomeIcon}></SidebarOption>
      <SidebarOption title="Search" Icon={SearchIcon}></SidebarOption>
      <SidebarOption
        title="Your Library"
        Icon={LibraryMusicIcon}
      ></SidebarOption>
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {props.playlists &&
        props.playlists?.items?.map((playlist) => {
          return (
            <SidebarOption
              title={playlist.name}
              key={playlist.id}
            ></SidebarOption>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
  };
};
export default connect(mapStateToProps)(Sidebar);
