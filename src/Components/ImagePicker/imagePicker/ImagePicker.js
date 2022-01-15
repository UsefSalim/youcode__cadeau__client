import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../utils';
import RUG, { DragArea, DropArea, } from 'react-upload-gallery'
// Add style manually
import 'react-upload-gallery/dist/style.css' // or scss
import "../communStyle.css";
import "./style.css";
// import addImg from "../../assets/add_image.png";


const propTypes = {
    children: PropTypes.node,
    horizontal: PropTypes.bool,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func,
    desc: PropTypes.string,
    hideDeleteBtn: PropTypes.bool,
    hideDeleteBtn: PropTypes.bool,
    hideUpdateBtn: PropTypes.bool
};

const defaultProps = {
    horizontal: true,
    desc: "Sélectionnez ou Glissez-déposez votre logo ici .."
};

const ImagePicker = (props) => {
    const {
        className,
        cssModule,
        horizontal,
        onRemove,
        onUpdate,
        desc,
        hideDeleteBtn,
        hideUpdateBtn,
        imagesData,
        setImagesData,
        tag: Tag,
        ...attributes
    } = props;

    const classes = mapToCssModules(classNames(
        "sob-image-picker",
        horizontal ? "sob-image-picker-direction-horizontal" : "sob-image-picker-direction-vertical",
        className,
    ), cssModule);
    let customOpenDialogue = null;
    const remove = (image) => {
        setImagesData(imagesData.filter((item) => item.uid !== image.uid))
    }
    return (
        <RUG
            autoUpload={false}

            className={classes}
            header={({ openDialogue }) => {
                customOpenDialogue = openDialogue;
                return (
                    <DropArea>
                        {
                            (isDrag) => <button onClick={openDialogue} className={`sob-image-picker-header ${isDrag ? "sob-image-is-drag" : ""}`}>
                                <img className="sob-image-picker-header-icon" src={addImg} alt="add icon" />
                                <span className="sob-image-picker-header-desc">{desc}</span>
                            </button>
                        }
                    </DropArea>
                )
            }}
            onChange={(images) => {
                console.log("images", images)

                if (images[0]) {
                    setImagesData([images[0]])
                } else {
                    setImagesData([])
                }
                console.log("imagesData etststdts", imagesData)
            }}
            {...attributes}
        >
            {
                (isDrag) => (
                    <div>
                        {
                            imagesData.map((image, index) => {
                                return (
                                    <div key={"imagePicker__" + index}>
                                        <div>
                                            <div className="rug-item">
                                                <div className="rug-card __error">
                                                    <div className="rug-card-name">
                                                        <div>{image.name}
                                                            <div className="rug-card-size">{image.size}</div>
                                                        </div>
                                                    </div>
                                                    <div className="rug-card-image" style={{ backgroundImage: `url(${image.source})` }} />
                                                    {(!hideDeleteBtn) ? <div className="card-image-actions">
                                                        {/* {!hideUpdateBtn ? <button onClick={() => {
                                                            onUpdate(() => {
                                                                if (customOpenDialogue) customOpenDialogue();
                                                                image.remove();
                                                            })
                                                        }} className="card-image-action-update">Changer</button> : ""} */}
                                                        {!hideDeleteBtn ? <button onClick={() => {
                                                            onRemove(() => remove(image))
                                                        }} className="card-image-action-delete">Supprimer</button> : ""}
                                                    </div> : ""}
                                                    {/* <div className="rug-card-refresh ">
                                                        <div style={{ padding: '7px' }}>
                                                            <svg viewBox="0 0 65 65" className="__refresh-icon"><g><path d="m32.5 4.999c-5.405 0-10.444 1.577-14.699 4.282l-5.75-5.75v16.11h16.11l-6.395-6.395c3.18-1.787 6.834-2.82 10.734-2.82 12.171 0 22.073 9.902 22.073 22.074 0 2.899-0.577 5.664-1.599 8.202l4.738 2.762c1.47-3.363 2.288-7.068 2.288-10.964 0-15.164-12.337-27.501-27.5-27.501z" /><path d="m43.227 51.746c-3.179 1.786-6.826 2.827-10.726 2.827-12.171 0-22.073-9.902-22.073-22.073 0-2.739 0.524-5.35 1.439-7.771l-4.731-2.851c-1.375 3.271-2.136 6.858-2.136 10.622 0 15.164 12.336 27.5 27.5 27.5 5.406 0 10.434-1.584 14.691-4.289l5.758 5.759v-16.112h-16.111l6.389 6.388z" /></g></svg>
                                                        </div>
                                                    </div>
                                                    <div className="rug-card-remove">
                                                        <svg viewBox="0 0 40 40"><path stroke="current" strokeLinecap="round" strokeWidth={4} d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
                                                    </div> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                )
            }
        </RUG>
    );
};

ImagePicker.propTypes = propTypes;
ImagePicker.defaultProps = defaultProps;

export { ImagePicker };