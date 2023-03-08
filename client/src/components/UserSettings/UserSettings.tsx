import styles from './UserSettings.module.scss';
import avatar from '../../assets/avatar.png';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { handleUserUpdate, selectUser } from '../../features/auth-slice';
import { CustomInput } from '../UI/CustomInput';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../firebase';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { User } from '../../types/user';
import { uploadFile } from '../../types/uploadFile';
import { toast } from 'react-toastify';

export const UserSettings = () => {
  const user = useSelector(selectUser);

  const userBirthday = new Date(user!.birth as Date);
  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user ? user.email : '');
  const [profilePic, setProfilePic] = useState<File | null | string>(null);
  const [selectGender, setSelectGender] = useState(false);
  const [gender, setGender] = useState(user ? user.gender : 'choose');
  const [day, setDay] = useState(userBirthday.getDay() || undefined);
  const [month, setMonth] = useState(userBirthday.getMonth() || undefined);
  const [year, setYear] = useState(userBirthday.getFullYear() || undefined);

  // const [uploaded, setUploaded] = useState(false);
  const dispatch = useTypedDispatch();

  type userUpdate = User & {
    password?: string;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: userUpdate = {
      _id: user!._id,
      accessToken: user!.accessToken,
      username,
      email,
      gender,
      isAdmin: user!.isAdmin,
    };

    if (password) newUser.password = password;

    if (day && month && year) {
      const birthday = new Date(year, month, day);
      newUser.birth = birthday;
    }

    dispatch(handleUserUpdate(newUser))
      .then(() => {
        toast.success('Update successful');
      })
      .catch((err) => {
        toast.error('Update failed');
      });
  };

  const upload = (item: uploadFile) => {
    const filename = new Date().getTime() + item.label + item.file.name;
    const storageRef = ref(storage, `/items/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, item.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress + '%');
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfilePic(downloadURL);
        });
        // setUploaded(true);
      }
    );
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement> | File) => {
    if (e instanceof File) {
      setProfilePic(e);
      upload({ file: e, label: 'profilePic' });
    }
  };

  return (
    <div className={styles.userSettings}>
      <h2 className={styles.userSettingsTitle}>My settings</h2>

      <form className={styles.userSettingsForm} onSubmit={handleSubmit}>
        <div className={styles.userSettingsInputs}>
          <div className={styles.userSettingsMain}>
            <div className={styles.userSettingsFileInputWrapper}>
              <CustomInput
                type="file"
                id="profilePic"
                name="profilePic"
                label="true"
                onChange={handleUpload}
              />
              {user!.profilePic ? (
                <img
                  src={user!.profilePic}
                  alt=""
                  className={styles.userSettingsImg}
                />
              ) : (
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic as File)
                      : avatar
                  }
                  alt=""
                  className={styles.userSettingsImg}
                />
              )}
            </div>

            <div className={styles.userSettingsInputWrapper}>
              <label htmlFor="username" className={styles.userSettingsLabel}>
                User name
              </label>
              <input
                type="username"
                id="username"
                className={styles.userSettingsInput}
                placeholder={user!.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.userSettingsInputWrapper}>
              <label htmlFor="email" className={styles.userSettingsLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.userSettingsInput}
                placeholder={user!.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.userSettingsInputWrapper}>
              <label htmlFor="password" className={styles.userSettingsLabel}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={styles.userSettingsInput}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.userSettingsAdditional}>
            <h5 className={styles.userSettingsAdditionalTitle}>Your gender</h5>
            <div className={styles.userSettingsGenderWrapper}>
              <div
                className={styles.userSettingsGender}
                onClick={() => setSelectGender(!selectGender)}
              >
                <span>{gender ? gender : 'Choose'}</span>
                <i className="fa-solid fa-sort-down"></i>
              </div>
              {selectGender && (
                <div className={styles.userSettingsRadioInputWrapper}>
                  <input
                    type="radio"
                    name="sex"
                    id="male"
                    value="male"
                    className={styles.userSettingsRadioInput}
                  />
                  <label
                    htmlFor="male"
                    className={styles.userSettingsRadioLabel}
                    onClick={() => {
                      setGender('male');
                      setSelectGender(false);
                    }}
                  >
                    Male
                  </label>
                  <input
                    type="radio"
                    name="sex"
                    id="female"
                    value="female"
                    className={styles.userSettingsRadioInput}
                  />
                  <label
                    htmlFor="female"
                    className={styles.userSettingsRadioLabel}
                    onClick={() => {
                      setGender('female');
                      setSelectGender(false);
                    }}
                  >
                    Female
                  </label>
                </div>
              )}
            </div>
            <h5 className={styles.userSettingsAdditionalDateTitle}>
              Date of birth
            </h5>
            <div className={styles.userSettingsDate}>
              <div className={styles.userSettingsDateSelectWrapper}>
                <select
                  name="day"
                  id="day"
                  className={styles.userSettingsDateSelect}
                  value={day}
                  onChange={(e) => setDay(parseInt(e.target.value))}
                >
                  <option>day</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </div>
              <div className={styles.userSettingsDateSelectWrapper}>
                <select
                  name="month"
                  id="month"
                  className={styles.userSettingsDateSelect}
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                >
                  <option disabled>month</option>
                  <option value={0}>Jan</option>
                  <option value={1}>Feb</option>
                  <option value={2}>Mar</option>
                  <option value={3}>Apr</option>
                  <option value={4}>May</option>
                  <option value={5}>June</option>
                  <option value={6}>July</option>
                  <option value={7}>Aug</option>
                  <option value={8}>Sept</option>
                  <option value={9}>Oct</option>
                  <option value={10}>Nov</option>
                  <option value={11}>Dec</option>
                </select>
              </div>
              <div className={styles.userSettingsDateSelectWrapper}>
                <select
                  name="year"
                  id="year"
                  className={styles.userSettingsDateSelect}
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                >
                  <option>year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1995">1994</option>
                  <option value="1995">1993</option>
                  <option value="1995">1992</option>
                  <option value="1995">1991</option>
                  <option value="1995">1990</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className={styles.userSettingsFormButton}>
          Apply changes
        </button>
      </form>
    </div>
  );
};
