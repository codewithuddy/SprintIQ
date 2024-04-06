import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import FrameComponent7 from "@src/components/frame-component7";
import ButtonPrimary from "@src/components/button-primary";

const CreateGame: NextPage = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState([{ question: "", options: [""] }]);

  const onPolygonIconClick = useCallback(() => {
    void router.push("/dashboard/game");
  }, [router]);

  const onUploadImagevideoTextClick = useCallback(() => {
    // Please sync "Set Timer" to the project
  }, []);

  // const onGroupContainerClick = useCallback(() => {
  //   // Add a new empty option when "Add more options" is clicked
  //   setOptions([...options, ""]);
  // }, [options]);

  const onSetTimerTextClick = useCallback(() => {
    // Please sync "set timer" to the project
  }, []);

  const onAddQuestionClick = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: "", options: [""] }
    ]);
  };

  const onAddOptionClick = (questionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options.push("");
      return updatedQuestions;
    });
  };

  const handleQuestionChange = (index, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].question = value;
      return updatedQuestions;
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return updatedQuestions;
    });
  };

  return (
    <div className=" p-[3.75rem]  " >
    <div className="  relative border rounded-[1.25rem] border-[#373737] flex w-full flex-col items-start justify-start gap-[105px] overflow-hidden  pt-[2.5rem] tracking-[normal] [background:linear-gradient(180deg,_#0e2615,_#0f0f0f)] lg:pl-[57px] lg:pr-[57px]  ">
    <section className="  text-41xl font-inter flex w-[1456px] max-w-full flex-col items-end justify-start gap-[50px] text-center text-white  ">
      <header className="text-[#1FC04D] font-inter flex h-[133px] flex-row items-start justify-between gap-[20px] self-stretch text-center">
        <div className="flex h-[51.1px] w-[314px] flex-row items-center justify-start gap-[43.9px]">
          <div className="flex flex-col items-center justify-start  px-0 pb-0 pt-[3px]">
            <img
              className="relative h-[1.875rem] w-[1.875rem] cursor-pointer object-contain"
              loading="lazy"
              alt=""
              src="/polygon-4.svg"
              onClick={onPolygonIconClick}
            />
          </div>
          <div className="flex h-[45.1px] flex-1 flex-row items-end justify-start gap-[10.4px]">
            <img
              className="relative h-[45.1px] w-[40.6px] object-cover"
              loading="lazy"
              alt=""
              src="/group-1124@2x.png"
            />
            <div className="box-border flex h-[31.1px] flex-1 flex-col items-start justify-end px-0 pb-[1.1px] pt-0">
              <img
                className="relative h-[30px] max-w-full shrink-0 self-stretch overflow-hidden"
                loading="lazy"
                alt=""
                src="/sprint-iq.svg"
              />
            </div>
          </div>
        </div>
        <FrameComponent7 />
      </header>
      <div className="box-border flex w-[1415px] max-w-full flex-row items-start justify-center px-5 py-0">
        <div className=" flex w-[1089px] max-w-full flex-col items-start justify-start gap-[36px]">
          <div className="box-border flex max-w-full flex-row items-start justify-center self-stretch py-0 pl-5 pr-[21px]">
            <input className="  font-inherit text-[3.75rem] relative m-0 flex h-[76px]  max-w-full shrink-0 items-center justify-center font-normal leading-[22.53px] text-inherit bg-transparent text-[#FFFFFF] w-full text-center placeholder-[#FFFFFF] outline-none " type="text" placeholder="Input Game Title" />
          </div>
          <div className="border-[#373737] relative box-border h-px self-stretch border-t-[1px] border-solid" />
        </div>
      </div>
    </section>
    <section className="text-13xl font-inter box-border flex w-[1391px] max-w-full flex-row items-start justify-center px-0 pb-[0.625rem] pt-0 text-center text-white">
      <div className="flex w-[1195px] max-w-full flex-col items-end justify-start gap-[68.5px] lg:gap-[34px_68.5px]">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="flex max-w-full flex-row flex-wrap items-start justify-start gap-[29px] self-stretch">
            <div className="box-border flex w-[38px] flex-col items-start justify-start py-0 pl-0 pr-[23px]">
              <div className="text-[2rem] relative self-stretch leading-[23px]">{questionIndex + 1}</div>
            </div>
            <div className="box-border flex min-w-[561px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-3">
              <input
                className="relative box-border bg-transparent self-stretch border-b-[1px] border-solid outline-none border-[#373737]"
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              />
            </div>
            <div className="text-darkgray box-border flex h-11 w-[236px] flex-col items-start justify-start px-0 pb-0 pt-4 text-xl">
              <div className="flex flex-1 flex-row items-start justify-start self-stretch">
                <img
                  className="relative z-[1] h-7 min-h-[28px] w-7"
                  alt=""
                  src="/vector-11.svg"
                />
                <div className="flex flex-1 flex-col items-start justify-start px-0 pb-0 pt-0.5">
                  <div
                    className="mq450:text-base mq450:leading-[18px] relative cursor-pointer self-stretch leading-[23px]"
                    onClick={onUploadImagevideoTextClick}
                  >
                    Upload image/video
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex w-[204px] flex-col items-start justify-start mb-2 px-0 pb-0 pt-0.5">
                  <div className="flex flex-col items-start justify-start gap-[26px] self-stretch">
                    <div className="flex flex-row items-center justify-start self-stretch">
                      <div className="bg-[#28FF15] relative z-[1] h-[33px] w-[33px] rounded-[50%]" />
                      <div className="ml-[1.25rem] w-[9.375rem] flex flex-1 flex-col items-start justify-end px-0 pb-1 pt-0">
                        <input
                          className="text-[1.25rem] relative self-stretch leading-[22.53px] bg-transparent outline-none placeholder-[#FFFFFF]"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-[1.25rem] text-darkslategray border-[#373737] z-[1] box-border flex min-w-[593px] max-w-full flex-1 flex-row items-end justify-start gap-[34.8px] border-[1px] border-solid px-[33px] pb-[26px] pt-[23px]">
              <div className="box-border flex w-[294.2px] flex-col items-start justify-end px-0 pb-[3.3px] pt-0">
                <div
                  className="relative z-[2] h-[53.7px] cursor-pointer self-stretch"
                  onClick={() => onAddOptionClick(questionIndex)}
                >
                  <div className="text-[1.25rem] text-[#373737] absolute left-[calc(50%_-_80px)] top-[0px] flex h-full w-[200px] items-center justify-center leading-[22.53px]">
                    Add more options
                  </div>
                  <div className="absolute left-[273.2px] top-[16.3px] flex flex-row items-start justify-start">
                    <div className="relative h-[21px] w-[21px]">
                      <img
                        className="absolute left-[0px] top-[0px] h-[21px] w-[21px]"
                        alt=""
                        src="/vector-21.svg"
                      />
                      <div className="absolute left-[0px] top-[0px] h-full w-full">
                        <img
                          className="absolute left-[0px] top-[0px] z-[1] h-[21px] w-[21px]"
                          alt=""
                          src="/vector-21.svg"
                        />
                        <img
                          className="absolute left-[0px] top-[0px] z-[2] h-[21px] w-[21px]"
                          alt=""
                          src="/vector-21.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-border flex w-[313.2px] flex-col items-start justify-end pb-px pl-0 pr-[14.2px] pt-0">
                <input className="text-[1.25rem] text-[#373737] relative flex h-[53px] shrink-0 items-center justify-center self-stretch leading-[22.53px] bg-transparent outline-none placeholder-[#373737] " placeholder="Set Correct Option" />
              </div>
              <div className="rounded-3xs border-darkslategray relative box-border hidden h-[106px] w-[913px] max-w-full border-[1px] border-solid" />
              <input
                className="text-[1.25rem] text-[#373737] relative flex h-[54px] w-[154px] shrink-0 cursor-pointer items-center justify-center leading-[22.53px] bg-transparent outline-none placeholder-[#373737] "
               placeholder=" Set Timer" 
              />
             
            </div>
          </div>
        ))}
      </div>
    </section>
    <ButtonPrimary
          addQuestion="Add Question"
          onButtonPrimaryClick={onAddQuestionClick}
          //onButtonPrimary1Click={onAddQuestionClick}
        />
    </div>
    </div>
  );
};

export default CreateGame;






