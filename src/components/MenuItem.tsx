import { Dispatch, SetStateAction } from "react";
import { MenuItem } from "../constants";

type GetMenuItemArgs = {
    callback: Dispatch<SetStateAction<MenuItem>>;
    item: MenuItem;
    isActive: boolean;
    showSeperator: boolean;
}

export const _getMenuItem = ({callback, isActive, item, showSeperator }: GetMenuItemArgs) => {
    const seperator = <span className="seperator">|</span>;
    const button = <button
        key={item.name}
        onClick={() => callback(item)}
        className={isActive ? 'active': ''}>
            {item.name}
        </button>;

    return <li key={item.name}>
        {button} { showSeperator && seperator}
    </li>;
}

export const _generateMenuOptions = (items: MenuItem[], setSelectedItem: Dispatch<SetStateAction<MenuItem>>, selectedItem: MenuItem) => {
    return items.map((item, index) => {
        return _getMenuItem({
            callback: setSelectedItem,
            isActive: item.name === selectedItem.name,
            item: item,
            showSeperator: index !== items.length - 1
        });
    });
};
