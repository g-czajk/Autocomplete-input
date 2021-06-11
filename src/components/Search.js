import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

const Search = ({ data }) => {
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const wrapperRef = useRef(null);

    const handleMousedown = (e) => {
        const wrapper = wrapperRef.current;
        if (wrapper && !wrapper.contains(e.target)) {
            setIsVisible(false);
        }
    };

    const updateInput = (value) => {
        setInputValue(value);
        setIsVisible(false);
    };

    useEffect(() => {
        window.addEventListener("mousedown", handleMousedown);
        return () => {
            window.removeEventListener("mousedown", handleMousedown);
        };
    });

    return (
        <form autoComplete="off" action="/">
            <div className="input-wrapper" ref={wrapperRef}>
                <input
                    type="text"
                    placeholder="username"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsVisible((prevState) => !prevState)}
                />
                <div className="autocomplete-container">
                    {data &&
                        inputValue &&
                        isVisible &&
                        data
                            .filter((user) =>
                                user.username
                                    .toLowerCase()
                                    .startsWith(inputValue.toLowerCase())
                            )
                            .sort((a, b) =>
                                a.username.localeCompare(b.username)
                            )
                            .map((user) => (
                                <div
                                    className="option"
                                    tabIndex={0}
                                    key={user.id}
                                    onClick={() => updateInput(user.username)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        updateInput(user.username)
                                    }
                                >
                                    {
                                        <span>
                                            <strong>
                                                {user.username.substr(
                                                    0,
                                                    inputValue.length
                                                )}
                                            </strong>
                                            {user.username.substr(
                                                inputValue.length
                                            )}
                                        </span>
                                    }
                                </div>
                            ))}
                </div>
            </div>
            <input
                type="submit"
                value="Submit"
                onClick={(e) => e.preventDefault()}
            />
        </form>
    );
};

const mapStateToProps = (state) => {
    const { data } = state;
    return {
        data,
    };
};

export default connect(mapStateToProps, null)(Search);
