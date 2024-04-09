// ShareButton.js

import React from "react";
import '../css/export-share.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt} from '@fortawesome/free-solid-svg-icons';
const ShareButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="export-share-button">
              <FontAwesomeIcon icon={faShareAlt}/> Share
    </button>
  );
};

export default ShareButton;

