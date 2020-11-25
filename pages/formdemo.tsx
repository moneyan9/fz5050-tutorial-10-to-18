import { Form, Formik, Field } from 'formik';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
//Fomikにあてるフォーム用のデータ構造
import { VtuberDetails } from '../interfaces/vtuberdetails';


//Formik用データ構造初期値
const initialValues: VtuberDetails = {
    fullName: '',
    height: 0,
    language: [],
    details: '',
    groupid: -1,
    inAction: false
};

const FormDemo = () => {

    return (
        <div>
            {/*入力フォームにFormikを利用する */}
            <Formik initialValues={initialValues} onSubmit={() => { }}>
                {({ values }) => (
                    <Form>
                        {/* デフォルト inputタグ相当 */}
                        <Field name="fullName" as={TextField} label="Full Name" />

                        {/* material-uiのtype props でnumber指定 */}
                        <Field name="height" as={TextField} type="number" label="height" />



                        {/* type でcheckbox指定 */}
                        <Field name="language" value="japanese" type="checkbox" />
                        <Field name="language" value="english" type="checkbox" />
                        <Field name="language" value="other" type="checkbox" />

                        {/* マルチラインのtextarea相当 */}
                        <Field name="details" as={TextField} multiline rows={5} />

                        {/* textFeildのselect propでセレクトフォームを作成する */}
                        {/* select自体の使いかたは各ページで見る */}
                        <Field name="groupid" as={TextField} select>
                            <MenuItem value={-1}>----</MenuItem>
                            <MenuItem value={0}>freelance</MenuItem>
                            <MenuItem value={1}>VOMS</MenuItem>
                            <MenuItem value={2}>holostars</MenuItem>
                            <MenuItem value={3}>nijisanji</MenuItem>
                            <MenuItem value={4}>hololive</MenuItem>
                            <MenuItem value={5}>animare</MenuItem>
                        </Field>

                        <Field name="inAction" type="checkbox" />

                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormDemo