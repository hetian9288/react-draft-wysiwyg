import {bgcolorStyleFn,colorStyleFn} from '../components/ColorPicker/utils';
/**
 * This is default toolbar configuration,
 * whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
 */
export default {
    options: ['history', 'inline', 'fontSize', 'fontFamily', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove'],
    inline: {
        inDropdown: false,
        className: undefined,
        options: ['bold', 'italic', 'underline', 'strikethrough'],
        bold: { icon: 'e62f;', className: undefined },
        italic: { icon: 'e62c;', className: undefined },
        underline: { icon: 'e651;', className: undefined },
        strikethrough: { icon: 'e653;', className: undefined }
    },
    fontSize: {
        options: [12, 14, 18, 24, 30, 36, 48, 60],
        className: undefined,
        dropdownClassName: undefined,
    },
    fontFamily: {
        options: [
            {
                name: '正常',
                value: 'Arial'
            },
            {
                name: '微软雅黑',
                value: '微软雅黑, "Microsoft YaHei"'
            }
        ],
        className: undefined,
        dropdownClassName: undefined,
    },
    textAlign: {
        inDropdown: true,
        className: undefined,
        options: ['left', 'center', 'right', 'justify'],
        left: { icon: 'e64d;', className: undefined },
        center: { icon: 'e64b;', className: undefined },
        right: { icon: 'e64e;', className: undefined },
        justify: { icon: 'e64c;', className: undefined },
    },
    colorPicker: {
        className: undefined,
        popupClassName: undefined,
        options: ['color', 'bgcolor'],
        color: { icon: 'e60b;', className: undefined },
        bgcolor: { icon: 'e65c;', className: undefined },
    },
    link: {
        inDropdown: false,
        className: undefined,
        popupClassName: undefined,
        options: ['link', 'unlink'],
        link: { icon: 'e632;', className: undefined },
        unlink: { icon: 'e655;', className: undefined },
    },
    emoji: { icon: 'e646;', className: undefined, popupClassName: undefined },
    remove: { icon: 'e60a;', className: undefined },
    history: {
        inDropdown: false,
        className: undefined,
        options: ['undo', 'redo'],
        undo: { icon: 'e654;', className: undefined },
        redo: { icon: 'e642;', className: undefined },
    },
    plugins: [
        bgcolorStyleFn ,
        colorStyleFn
    ]
};
