import { Form, Formik, Field } from 'formik';

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
                        <Field name="fullName" />

                        {/* type でnumber指定 */}
                        <Field name="height" type="number" />


                        {/* type でcheckbox指定 */}
                        <Field name="language" value="japanese" type="checkbox" />
                        <Field name="language" value="english" type="checkbox" />
                        <Field name="language" value="other" type="checkbox" />

                        {/* textarea selectなどはasで指定 */}
                        <Field name="details" as="textarea" />

                        {/* option */}
                        <Field name="groupid" as="select">
                            <option value={-1}>----</option>
                            <option value={0}>freelance</option>
                            <option value={1}>VOMS</option>
                            <option value={2}>holostars</option>
                            <option value={3}>nijisanji</option>
                            <option value={4}>hololive</option>
                            <option value={5}>animare</option>
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