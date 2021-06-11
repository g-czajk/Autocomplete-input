import "./App.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "./store/actions/appActions";
import Search from "./components/Search";

const App = ({ fetchData }) => {
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <Search />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData()),
    };
};

export default connect(null, mapDispatchToProps)(App);
