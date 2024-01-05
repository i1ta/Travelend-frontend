import * as S from "./contact.styles";
import { useEffect, useState } from "react";

export default function ContactTripyle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");

  const [checked, setChecked] = useState(false);

  interface imageState {
    url?: string;
    name?: string;
  }

  // 이미지
  const [image, setImage] = useState<imageState>();
  const [selectedImageList, setSelectedImageList] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    setSelectedImageList((prev: File[]) => [...prev, file as File]);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage({ url: reader.result as string, name: file.name });
      });
      reader.readAsDataURL(file);
    }
  };

  const sendInfo = () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content === "") {
      alert("문의 내용을 입력해주세요.");
      return;
    }
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!checked) {
      alert("개인정보 이용동의를 해주셔야 합니다.");
      return;
    }
    console.log(title, content, email);
    alert("전송되었습니다.");
    setTitle("");
    setContent("");
    setEmail("");
    setImage({});
    setSelectedImageList([]);
  };

  return (
    <S.MainContainer>
      <S.TitleWrapper>
        <S.MainTitle>Contact</S.MainTitle>
        <S.MainTxt>
          Travelend를 방문해주신 Blender 여러분 모두 환영합니다!
          <br />
          - Travelend 이용 중 불편했던 점
          <br />
          - Travelend 에게 제안하고 싶은 내용
          <br />
          구체적인 문의 내용과 문의와 관련된 화면 스크린샷을 보내주시면 문제를
          보다 빠르게 확인할 수 있습니다.
        </S.MainTxt>
        <S.Line></S.Line>
      </S.TitleWrapper>

      <S.ContentContainer>
        <S.TitleBox>
          <S.TitleTag>제목</S.TitleTag>
          <S.TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.TitleBox>

        <S.EmailInput
          placeholder="답변 받을 메일 주소"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <S.ContentInput
          placeholder="문의 내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <S.PhotoBox>
          {selectedImageList.length === 0 ? (
            <>
              <S.NoImgWrapper htmlFor="first-upload-input">
                <S.NoImgIconWrapper>
                  <S.NoImgIcon src="/icon/image.svg" />
                  <S.NoImgTxt> 이미지 첨부</S.NoImgTxt>
                </S.NoImgIconWrapper>
              </S.NoImgWrapper>
              <input
                id="first-upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                multiple
              />
            </>
          ) : (
            <S.ImgWrapper>
              <S.Image src={image?.url || ""} />
            </S.ImgWrapper>
          )}
        </S.PhotoBox>

        <S.TermsBox>
          <S.TermsInput
            type="checkbox"
            checked={checked}
            onClick={() => setChecked(!checked)}
          />
          <S.TermsTxt>개인정보 이용동의 (필수)</S.TermsTxt>
        </S.TermsBox>
      </S.ContentContainer>

      <S.Btn onClick={sendInfo}>제출</S.Btn>
    </S.MainContainer>
  );
}
