import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="expense_navigation_wrapper">
            <div className="expense_navigation_container">
                <Link to="/summary">Summary</Link>
                <Link to="/general"><button>General</button></Link>
                <Link to="/food-beverage"><button>Food & Beverage</button></Link>
                <Link to="/mileage"><button>Mileage</button></Link>
                <Link to="/itemized-purchases"><button>Itemized Purchases</button></Link>
                <Link to="/upload-files"><button>Upload Files</button></Link>
            </div>
        </div>
    );
};

export default Header;
