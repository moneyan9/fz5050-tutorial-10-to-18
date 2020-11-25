import { Form, Formik, Field, useField } from 'formik';
import { TextField, Checkbox, FormControlLabel, CheckboxProps, FormGroup, Box } from '@material-ui/core';
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
                        <Box mb={2}>
                            <FormGroup>
                                <Field name="fullName" as={TextField} label="Full Name" />
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
                        <pre>{JSON.stringify(values, null, 4)}</pre>
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