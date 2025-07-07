import { Dispatch, SetStateAction } from "react";
import { NoiseMenuItem, VisualMenuItem } from "../constants";

type GetNoiseMenuItemArgs = {
    callback: Dispatch<SetStateAction<NoiseMenuItem>>;
    item: NoiseMenuItem;
    isActive: boolean;
    showSeperator: boolean;
}

type GetVisualMenuItemArgs = {
    callback: Dispatch<SetStateAction<VisualMenuItem>>;
    item: VisualMenuItem;
    isActive: boolean;
    showSeperator: boolean;
}

export const _getNoiseMenuItem = ({callback, isActive, item, showSeperator }: GetNoiseMenuItemArgs) => {
    const seperator = <span className="seperator">|</span>;
    const button = <button
        key={item.name}
        onClick={() => callback(item)}
        className={isActive ? 'active': ''}
        title={item.tooltip}>
            {item.name}
        </button>;

    return <li key={item.name}>
        {button} { showSeperator && seperator}
    </li>;
}

export const _getVisualMenuItem = ({callback, isActive, item, showSeperator }: GetVisualMenuItemArgs) => {
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

export const _generateNoiseMenuOptions = (items: NoiseMenuItem[], setSelectedItem: Dispatch<SetStateAction<NoiseMenuItem>>, selectedItem: NoiseMenuItem) => {
    return items.map((item, index) => {
        return _getNoiseMenuItem({
            callback: setSelectedItem,
            isActive: item.name === selectedItem.name,
            item: item,
            showSeperator: index !== items.length - 1
        });
    });
};

export const _generateVisualMenuOptions = (items: VisualMenuItem[], setSelectedItem: Dispatch<SetStateAction<VisualMenuItem>>, selectedItem: VisualMenuItem) => {
    return items.map((item, index) => {
        return _getVisualMenuItem({
            callback: setSelectedItem,
            isActive: item.name === selectedItem.name,
            item: item,
            showSeperator: index !== items.length - 1
        });
    });
};
