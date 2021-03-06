import React, { useRef, useState } from 'react'
import styles from '../../styles/TeamInfoForm/TagsStyle.module.css'

export default function InputTag({ tags, setTags }) {
    const [inputValue, setInputValue] = useState('')
    const tagRef = useRef(null)

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);

        // Call the defined function setTags which will replace tags with the new value.
        setTags(newTags);
    };

    const handleKeyDown = (e) => {
        const val = e.target.value;
        if (['Enter', ';'].indexOf(e.key) >= 0 && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            setInputValue('')
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyUp = (e) => {
        if(e.key === ';'){
            setInputValue('')
        }
    }

    const handleBlur = (e) => {
        const val = e.target.value;
        if(val){
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return setInputValue('');
            }
            setTags([...tags, val]);
        }
        setInputValue('')
    }


    return (
        <div className={styles.inputTag} onClick={() => tagRef.current.focus()}>
            <ul className={styles.inputTag__tags}>
                {tags.map((tag, i) => (
                    <li key={tag} id={tag + 'li'}>
                        {tag}
                        <button id={tag + 'btn'} type="button" onClick={() => { removeTag(i) }}>+</button>
                    </li>
                ))}
                <li className={styles.inputTag__tags__input}>
                    <input type="textarea" 
                    className={styles.invInput}
                    ref={tagRef}
                    placeholder='Insert team tags here'
                    onKeyDown={handleKeyDown} 
                    value={inputValue} 
                    onChange={handleChange} 
                    onKeyUp={handleKeyUp}
                    onBlur={handleBlur}
                    />
                </li>
            </ul>
        </div>
    );
}
