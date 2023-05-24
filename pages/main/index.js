import Main from '../../src/components/units/main/Main.container';
import { useRecoilValue } from 'recoil';
import { LoginState } from '../../src/States/LoginState';

export default function MainPage() {
    const loginState = useRecoilValue(LoginState);
    return(
        <>
            {loginState ? <Main login></Main> : <Main></Main>}
        </>
    )
}