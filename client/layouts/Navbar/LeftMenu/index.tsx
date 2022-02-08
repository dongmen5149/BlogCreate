import React from 'react';

const LeftMenu = () => {
    return (
        <nav id="sidebar">
            <ul id="side-nav">
                <li id="side-nav__item">
                    <a href="/workspace/write" id="side-nav__link">
                        <svg id="side-nav__icon">
                            <use xlinkHref="img/sprite.svg#icon-home"></use>
                        </svg>
                        <span>Write</span>
                    </a>
                </li>
                <li id="side-nav__item">
                    <a href="/workspace/view" id="side-nav__link">
                        <svg id="side-nav__icon">
                            <use xlinkHref="img/sprite.svg#icon-aircraft-take-off"></use>
                        </svg>
                        <span>View</span>
                    </a>
                </li>
            </ul>

            <div id="legal">&copy; hello my name is Ryu.</div>
        </nav>
    );
}

export default LeftMenu