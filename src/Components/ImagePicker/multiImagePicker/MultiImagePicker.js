import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../utils';
import RUG, { DragArea, DropArea, } from 'react-upload-gallery'
// Add style manually
import './reactUploadGallery.css' // or scss
import "../communStyle.css";
import "./style.css";
import addImg from "assets/add_image.png";
import { CgClose } from "react-icons/cg"
import { Input } from '../input';

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
    horizontal: false,
    desc: "Sélectionnez ou Glissez-déposez votre logo ici .."
};

const MultiImagePicker = (props) => {
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
        inputProps,
        selectProps,
        selectOptions,
        onChange,
        initialState,
        tag: Tag,
        ...attributes
    } = props;

    const classes = mapToCssModules(classNames(
        "sob-multi-image-picker",
        horizontal ? "sob-multi-image-picker-direction-horizontal" : "sob-multi-image-picker-direction-vertical",
        className,
    ), cssModule);
    let customOpenDialogue = null;
    // const [initialStateProvided, setInitialStateProvided] = useState(initialState ? true : false)
    // useEffect(() => {
    //     setInitialStateProvided(true);
    // }, [initialState]);
    const getImageUid = (uid) => {
        return imagesData.filter((item, index) => item.uid === uid)[0];
    }
    return (
        <RUG
            sorting
            helperClass="sorting"
            autoUpload={false}
            rules={{
                limit: 100,
            }}
            className={classes}
            header={({ openDialogue }) => {
                customOpenDialogue = openDialogue;
                return (
                    <DropArea>
                        {
                            (isDrag) => <button onClick={openDialogue} className={`sob-multi-image-picker-header ${isDrag ? "sob-multi-image-is-drag" : ""}`}>
                                <img className="sob-multi-image-picker-header-icon" src={addImg} alt="add icon" />
                                <span className="sob-multi-image-picker-header-desc">{desc}</span>
                            </button>
                        }
                    </DropArea>
                )
            }}
            initialState={initialState}
            onChange={(images) => {
                let formattedImages = [];
                formattedImages = [...formattedImages, ...images.map((item, index) => {
                    let label = "";
                    let attribute = "";
                    // check the item has label in initialState
                    if (item?.label && item?.label?.length !== 0) {
                        label = item?.label;
                    }
                    // check if item has attribute in initialState
                    if (item?.attribute && item?.attribute?.length !== 0) {
                        attribute = item?.attribute;
                    }
                    let searchedItem = imagesData.filter((item2, index2) => item2?.uid === item?.uid);
                    if (searchedItem.length !== 0) {
                        label = searchedItem[0].label;
                        attribute = searchedItem[0].attribute;
                    }
                    return ({ ...item, label, attribute })
                })]
                setImagesData([...formattedImages])
            }}
            {...attributes}
        >

            <DropArea>
                {
                    (isDrag) => {
                        return (
                            <DragArea className="rug-items __card __sorting">
                                {
                                    (image) => {
                                        return (
                                            <div key={image.uid} className="rug-item" style={{ margin: 10, border: isDrag ? "1px solid red" : "" }}>
                                                <div className="rug-card" style={{ margin: 0 }}>
                                                    <div className="rug-card-name">
                                                        <div>{image.name}
                                                            <div className="rug-card-size">{image.size}</div>
                                                        </div>
                                                    </div>
                                                    <div className="rug-card-image" style={{ backgroundImage: `url(${image.source})` }} />
                                                    {!hideDeleteBtn ? <button onClick={() => {
                                                        setImagesData(imagesData.filter((item, index) => item.uid !== image.uid))
                                                        if (onRemove)
                                                            onRemove(image)
                                                        if (image.remove)
                                                            image.remove(image.uid)
                                                        // image.remove()
                                                    }} className="card-image-action-delete">
                                                        <CgClose size={15} color="#fff"></CgClose>
                                                    </button> : ""}
                                                </div>
                                                <Input id={"Input__" + image.uid} defaultValue={getImageUid(image.uid)?.label} onChange={(e) => {
                                                    // setImageName(e.target.value)
                                                    let imagesDataTmp = imagesData;
                                                    let updatedFileIndex = imagesDataTmp.findIndex((item, index) => item.uid === image.uid);
                                                    let updatedFile = { ...imagesDataTmp[updatedFileIndex], label: e.target.value };
                                                    imagesDataTmp[updatedFileIndex] = updatedFile;
                                                    setImagesData(imagesDataTmp);
                                                }}
                                                    type="text"
                                                    placeholder="Donnez nom à cette image .."
                                                    style={{ marginBottom: 15, marginTop: 15 }}
                                                    {...inputProps}
                                                />
                                                <Input onChange={(e) => {
                                                    // setImageName(e.target.value)
                                                    let imagesDataTmp = imagesData;
                                                    let updatedFileIndex = imagesDataTmp.findIndex((item, index) => item.uid === image.uid);
                                                    let updatedFile = { ...imagesDataTmp[updatedFileIndex], attribute: e.target.value };
                                                    imagesDataTmp[updatedFileIndex] = updatedFile;
                                                    setImagesData(imagesDataTmp);
                                                }} value={getImageUid(image.uid)?.attribute} type="select" style={{ marginRight: 0 }} {...selectProps}>
                                                    <option value={""} defaultValue>{selectProps && selectProps.placeholder && selectProps.placeholder.length !== 0 ? selectProps.placeholder : "Sélectionner attribut"}</option>
                                                    {
                                                        selectOptions.map((item, index) => (<option value={item?.value}>{item?.label}</option>))
                                                    }
                                                </Input>
                                            </div>
                                        )
                                    }
                                }
                            </DragArea>
                        )
                    }
                }

            </DropArea>
        </RUG>
    );
};


MultiImagePicker.propTypes = propTypes;
MultiImagePicker.defaultProps = defaultProps;

export { MultiImagePicker };



// <RUG
// sorting
// autoUpload={false}
// rules={{
//     limit: 100,
// }}
// className={classes}
// header={({ openDialogue }) => {
//     customOpenDialogue = openDialogue;
//     return (
//         <DropArea>
//             {
//                 (isDrag) => <button onClick={openDialogue} className={`sob-multi-image-picker-header ${isDrag ? "sob-multi-image-is-drag" : ""}`}>
//                     <img className="sob-multi-image-picker-header-icon" src={addImg} alt="add icon" />
//                     <span className="sob-multi-image-picker-header-desc">{desc}</span>
//                 </button>
//             }
//         </DropArea>
//     )
// }}
// onChange={(images) => {
//     function comparer(otherArray) {
//         return function (current) {
//             return otherArray.filter(function (other) {
//                 return other.uid == current.uid
//             }).length == 0;
//         }
//     }
//     let formattedImages = [];
//     formattedImages = [...formattedImages, ...images.map((item, index) => {
//         let label = "";
//         let attribute = "";
//         let searchedItem = imagesData.filter((item2, index2) => item2.uid === item.uid);
//         if (searchedItem.length !== 0) {
//             label = searchedItem[0].label;
//             attribute = searchedItem[0].attribute;
//         }
//         return ({ ...item, label, attribute })
//     })]
//     if (initialStateProvided && initialState && initialState.length !== 0) {
//         formattedImages = [...formattedImages, ...initialState.map((item, index) => {
//             let label = "";
//             let attribute = "";
//             let searchedItem = initialState.filter((item2, index2) => item2.uid === item.uid);
//             if (searchedItem.length !== 0) {
//                 label = searchedItem[0].label;
//                 attribute = searchedItem[0].attribute;
//             }
//             return ({ ...searchedItem[0], label, attribute })
//         })]
//     }

//     var onlyInA = formattedImages.filter(comparer(imagesData));
//     var onlyInB = imagesData.filter(comparer(formattedImages));

//     const result = onlyInA.concat(onlyInB);

//     if (result.length !== 0) {
//         setImagesData([...imagesData, ...result])
//     } else {
//         setImagesData([...imagesData])
//     }
//     if (onChange) onChange(images);
// }}
// {...attributes}
// >
// {
//     (images) => (
//         <div className="rug-items __card __sorting">
//             {
//                 imagesData.map((image, index) => {
//                     return (
//                         <div key={image.uid} className="rug-item" style={{ margin: 10 }}>
//                             <div className="rug-card __error" style={{ margin: 0 }}>
//                                 <div className="rug-card-name">
//                                     <div>{image.name}
//                                         <div className="rug-card-size">{image.size}</div>
//                                     </div>
//                                 </div>
//                                 <div className="rug-card-image" style={{ backgroundImage: `url(${image.source})` }} />
//                                 {!hideDeleteBtn ? <button onClick={() => {
//                                     setImagesData(imagesData.filter((item, index) => item.uid !== image.uid))
//                                     if (onRemove)
//                                         onRemove(image)
//                                     if (image.remove)
//                                         image.remove()
//                                     // image.remove()
//                                 }} className="card-image-action-delete">
//                                     <CgClose size={15} color="#fff"></CgClose>
//                                 </button> : ""}
//                             </div>
//                             <Input id={index} defaultValue={image.label} onChange={(e) => {
//                                 // setImageName(e.target.value)
//                                 let imagesDataTmp = imagesData;
//                                 let updatedFileIndex = imagesDataTmp.findIndex((item, index) => item.uid === image.uid);
//                                 let updatedFile = { ...imagesDataTmp[updatedFileIndex], label: e.target.value };
//                                 imagesDataTmp[updatedFileIndex] = updatedFile;
//                                 setImagesData(imagesDataTmp);
//                             }}
//                                 type="text"
//                                 placeholder="Donnez nom à cette image .."
//                                 style={{ marginBottom: 15, marginTop: 15 }}
//                                 {...inputProps}
//                             />
//                             <Input onChange={(e) => {
//                                 // setImageName(e.target.value)
//                                 let imagesDataTmp = imagesData;
//                                 let updatedFileIndex = imagesDataTmp.findIndex((item, index) => item.uid === image.uid);
//                                 let updatedFile = { ...imagesDataTmp[updatedFileIndex], attribute: e.target.value };
//                                 imagesDataTmp[updatedFileIndex] = updatedFile;
//                                 setImagesData(imagesDataTmp);
//                             }} defaultValue={image.attribute} type="select" style={{ marginRight: 0 }} {...selectProps}>
//                                 <option value={""} defaultValue>{selectProps && selectProps.placeholder && selectProps.placeholder.length !== 0 ? selectProps.placeholder : "Sélectionner attribut"}</option>
//                                 {
//                                     selectOptions.map((item, index) => (<option value={item?.value}>{item?.label}</option>))
//                                 }
//                             </Input>
//                         </div>
//                     )
//                 }
//                 )
//             }
//         </div>
//     )
// }

// </RUG>