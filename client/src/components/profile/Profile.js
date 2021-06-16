import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileTop from './ProfileTop';

const Profile = ({ match }) => {
    const dispatch = useDispatch();
    const {
        profile: { profile },
        auth,
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getProfileById(match.params.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            {profile === null ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link to='/edit-profile' className='btn btn-dark'>
                                Edit Profile
                            </Link>
                        )}
                    <div className='profile-grid my-1'>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className='profile-exp bg-white p-2'>
                            <h2 className='text-primary'>Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((experience) => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>

                        <div className='profile-edu bg-white p-2'>
                            <h2 className='text-primary'>Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((education) => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>

                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
