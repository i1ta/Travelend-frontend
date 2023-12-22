import { useRecoilValue } from 'recoil';
import { LoginState } from '../src/States/LoginState';
import Main from '../src/components/units/main/Main.container';

export default function MainPage() {
    const loginState = useRecoilValue(LoginState);
    return(
        <>
            {loginState ? <Main login></Main> : <Main></Main>}
        </>
    )
}