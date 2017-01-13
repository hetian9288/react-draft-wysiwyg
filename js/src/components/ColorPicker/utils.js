import { DraftInlineStyle } from 'draft-js';
export function bgcolorStyleFn(styleSet) {
    const PREFIX = 'bgcolor-';
    return styleSet.map(style => {
        if (style.indexOf(PREFIX) !== -1) {
            const backgroundColor = style.substring(PREFIX.length);
            return {
                backgroundColor,
            }
        }
        return {};
    }).reduce(Object.assign);
}

export function colorStyleFn(styleSet: DraftInlineStyle) {
    const PREFIX = 'color-';
    return styleSet.map(style => {
        if (style.indexOf(PREFIX) !== -1) {
            const color = style.substring(PREFIX.length);
            return {
                color,
            }
        }
        return {};
    }).reduce(Object.assign);
}