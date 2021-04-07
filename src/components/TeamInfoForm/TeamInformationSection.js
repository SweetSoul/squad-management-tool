import React, { useState } from 'react'
import styledInput from '../../styles/TeamInfoForm/TagsStyle.module.css'
import InputTag from './InputTags'
import styles from '../../styles/TeamInfoForm/TeamInformationSection.module.css'

export default function TeamInformationSection(props) {
    const [invalid, setInvalid] = useState({'teamName': false, 'teamWebsite': false, 'teamType': false})

    const { teamName, setTeamName, 
        teamDescription, setTeamDescription, teamWebsite, teamType,
        setTeamWebsite, setTeamType, tags, setTags, setUnsaved } = props;

    function validateInput(e) {
        if (e.target.value === '' || e.target.value === null) {
            e.target.setAttribute('isinvalid', 'true')
            setInvalid({...invalid, [`${e.target.name}`] : true})
            return console.log(invalid[e.target.name])
        } else {
            e.target.removeAttribute('isinvalid')
            setUnsaved(true)
            setInvalid({...invalid, [`${e.target.name}`] : false})
        }
        if (e.target.attributes.type.value === 'URL') {
            let expression = /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/gi;
            let regex = new RegExp(expression);
            if (!e.target.value.match(regex)) {
                setInvalid({...invalid, [`${e.target.name}`] : true})
                return e.target.setAttribute('isinvalidurl', 'true')
            } else {
                setInvalid({...invalid, [`${e.target.name}`] : false})
                return e.target.removeAttribute('isinvalidurl')
            }
        }
    }

    function clearStyles(e){
        document.getElementById('radioContainer').classList.remove('invalidRadio')
    }

    return (
        <section className={styles.firstSection}>
            <h3>Team Information</h3>
            <form noValidate>
                <div className={styles.col}>
                    <label>
                        <h6 isinvalid={invalid.teamName.toString()}>Team name *</h6>
                        <input
                            type='text'
                            autoComplete='team name'
                            placeholder='Insert team name'
                            aria-label='Team name'
                            name='teamName'
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            onBlur={validateInput}
                            className={styles.textInput}
                        />
                        <span className={styles.missingField}>Team name field is required</span>
                    </label>
                    <label>
                        <h6>Description</h6>
                        <textarea
                            autoComplete='team description'
                            aria-label='Team description'
                            name='teamDescription'
                            value={teamDescription}
                            onChange={(e) => setTeamDescription(e.target.value)}
                            rows='10'
                        />
                    </label>
                </div>
                <div className={styles.col}>
                    <div>
                        <label>
                            <h6 isinvalid={invalid.teamWebsite.toString()}>Team website *</h6>
                            <input
                                type='URL'
                                autoComplete='team website'
                                placeholder='YourTeamWebsite.com'
                                aria-label='Team website'
                                name='teamWebsite'
                                id='teamWebsiteInput'
                                onBlur={validateInput}
                                value={teamWebsite}
                                onChange={(e) => setTeamWebsite(e.target.value)}
                                className={styles.textInput}
                            />
                            <span className={styles.missingField}>Team website field is required</span>
                            <span className={styles.errorUrl}>Team website requires a valid URL</span>
                        </label>
                    </div>
                    <div>
                        <div id='radioContainer'>
                            <h6 isinvalid={invalid.teamType.toString()}>Team type *</h6>
                            <div className={styles.radioContainer}>
                                <label className={styles.radio}>
                                    <input
                                        type='radio'
                                        aria-label='Real option team type'
                                        name='teamType'
                                        id='realOp'
                                        value='Real'
                                        checked={(teamType === 'Real') ? true : false}
                                        onBlur={clearStyles}
                                        onChange={(e) => setTeamType(e.target.value)}
                                    />
                                    <span className={styles.designRadio}></span>
                                    <label htmlFor='realOp' className={styles.radioTxt}>Real</label>
                                </label>
                                <label className={styles.radio}>
                                    <input
                                        type='radio'
                                        aria-label='Fantasy option team type'
                                        name='teamType'
                                        id='fantasyOp'
                                        value='Fantasy'
                                        onBlur={clearStyles}
                                        checked={(teamType === 'Fantasy') ? true : false}
                                        onChange={(e) => setTeamType(e.target.value)}
                                    />
                                    <span className={styles.designRadio}></span>
                                    <label htmlFor='fantasyOp' className={styles.radioTxt}>Fantasy</label>
                                    <span className={styles.missingField}>Team type field is required</span>
                                </label>

                            </div>
                        </div>

                        <label className={styles.tagifyContainer}>
                            <h6>Tags</h6>
                            <InputTag styles={styledInput} tags={tags} setTags={setTags} />
                        </label>
                    </div>
                </div>
            </form>
        </section>
    )
}