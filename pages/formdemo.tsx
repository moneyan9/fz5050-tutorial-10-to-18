import { Form, Formik, Field, useField, ErrorMessage } from 'formik';
import { Button, TextField, Checkbox, FormControlLabel, CheckboxProps, FormGroup, Box } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
//Fomikにあてるフォーム用のデータ構造
import { VtuberDetails } from '../interfaces/vtuberdetails';


//yup関連
import { object, string, number, boolean, array, mixed } from 'yup';


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
            <Formik
                validationSchema={
                    object(
                        {
                            fullName: string().required().min(2).max(16),
                            height: number().required().min(0),
                            language: array(string().oneOf(['japanese', 'english', 'other'])).min(1), //どれか１つを必ずチェック＋チェックボックスの値であること
                            details: mixed().when('language', {
                                is: (language: string[]) => language.find(data => data === 'other'), //条件をここに書く
                                then: string().required().min(2), //2文字以上何か記入必須
                                otherwise: string()
                            }),

                            groupid: number().required().min(0).max(5),
                            inAction: boolean().oneOf([true]), //チェック必須

                        }
                    )
                }

                initialValues={initialValues} onSubmit={(values, formikHelpers) => {
                    return new Promise((res, rej) => {
                        setTimeout(() => {
                            console.log(values);
                            console.log(formikHelpers);
                            console.log('---------');
                            res();
                        }, 3000); // submit押下したときにsetTimeoutで3秒後に１回だけ実行させる
                    })

                }}>


                {/* isSubmitting, isValidatingを追加 */}
                {({ values, errors, touched, isValid, isValidating, isSubmitting }) => (
                    <Form>
                        <Box mb={2}>
                            <FormGroup>
                                <Field name="fullName" as={TextField} label="Full Name" />

                                {/* ErrorMessageで表示制御*/}
                                <ErrorMessage name="fullName" />
                            </FormGroup>
                        </Box>

                        {/* フルネーム指定も可能 */}
                        <Box marginBottom={2}>
                            <FormGroup>
                                {/* material-uiのtype props でnumber指定 */}
                                <Field name="height" as={TextField} type="number" label="height" />
                            </FormGroup>
                        </Box>

                        <Box marginBottom={2}>
                            <FormGroup>
                                <MyCheckbox name="language" value="japanese" label="japanese" />
                                <MyCheckbox name="language" value="english" label="english" />
                                <MyCheckbox name="language" value="other" label="other" />
                            </FormGroup>
                        </Box>

                        <Box marginBottom={2}>
                            <FormGroup>
                                {/* マルチラインのtextarea相当 */}
                                <Field name="details" as={TextField} multiline rows={5} />
                            </FormGroup>
                        </Box>

                        <Box marginBottom={2}>
                            <FormGroup>
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
                            </FormGroup>
                        </Box>

                        <Box marginBottom={2}>
                            <FormGroup>
                                <MyCheckbox name="inAction" label="inAction" />
                            </FormGroup>
                        </Box>

                        <Button type="submit" variant="contained" color="primary" disabled={!isValid || isValidating || isSubmitting} >Submit</Button>

                        <pre>{JSON.stringify(values, null, 4)}</pre>
                        {/* バリデーション状況の出力*/}
                        <pre>{JSON.stringify(errors, null, 4)}</pre>

                        {/* touched状況の出力*/}
                        <pre>{JSON.stringify(touched, null, 4)}</pre>

                        <p>isValid:{isValid.toString()}</p>
                        <p>isValidating:{isValidating.toString()}</p>
                        <p>isSubmitting:{isSubmitting.toString()}</p>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormDemo

//カスタムコンポーネントが受け取るデータの構造
export interface MyCheckboxProps extends CheckboxProps {
    name: string;
    value?: string | number;
    label?: string;
}

const MyCheckbox = (props: MyCheckboxProps) => {

    //useFieldでreact custom hook
    const [field] = useField({
        name: props.name,
        type: 'checkbox',
        value: props.value
    })


    return (
        <FormControlLabel control={<Checkbox {...props} {...field} />} label={props.label} />
    );
}