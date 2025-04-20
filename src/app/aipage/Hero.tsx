"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/sections/logo.png";

function Hero() {
  const [first, setFirst] = useState("");
  const [startingHero, setStartHero] = useState(true);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    { question: string; answer: string }[]
  >([]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFirst(e.target.value);
  }

  async function getOutput(question: string) {
    let response: string;

    response = await ragOutput(question);

    // Update the questions and answers state
    setQuestionsAndAnswers((prev) => [
      ...prev,
      { question: question, answer: response },
    ]);
  }

  async function ragOutput(question: string): Promise<string> {
    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      if (res.ok) {
        const response = await res.json();
        console.log(response["response"]);

        return response["response"] as string;
      }
    } catch (error) {
      console.error("Error fetching RagOutput:", error);
    }
    return "Failed to fetch output.";
  }

  async function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentQuestion = first.trim();
      if (currentQuestion) {
        setFirst(""); // Clear the input field
        await getOutput(currentQuestion);
        setStartHero(false)
      }
    }
  }

  const AnswerComponent = ({ answer }: { answer: string }) => {
    let parsedAnswer: any;

    try {
      parsedAnswer = JSON.parse(answer);
    } catch {
      parsedAnswer = null;
    }

    return (
      <div className="border border-white/20 p-5 rounded-lg max-w-2xl w-full md:w-1/2 mx-auto text-sm md:text-base mt-5">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12">
            <Image src={logo} alt="Logo" width={48} height={48} />
          </div>
          <div className="ml-2 text-lg">GymmRock</div>
        </div>
        <div>
          {Array.isArray(parsedAnswer) ? (
            <ul className="list-disc pl-5">
              {parsedAnswer.map((item: any, index: number) => (
                <li key={index} className="my-2">
                  <span className="font-semibold text-orange-500">
                    {item.Exercise}:
                  </span>{" "}
                  {item.Description}
                </li>
              ))}
            </ul>
          ) : (
            answer.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="mb-10">
      <div className="container">
        {startingHero ? (
          <div className="flex flex-col items-center gap-14">
            <div className="mx-auto text-center mt-20 max-auto-full font-sans tracking-tight text-3xl md:text-5xl">
              Let&apos;s begin the{" "}
              <span className="italic font-sans bg-clip-text bg-gradient-to-r from-orange-600 to-orange-300 text-transparent">
                Work
              </span>{" "}
              out
            </div>

            <textarea
              style={{
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onChange={handleChange}
              onKeyDown={onKeyDown}
              placeholder="Please type here"
              value={first}
              className="p-5 bg-transparent border-2 border-orange-600 text-lg rounded-full md:rounded-lg w-11/12 md:w-3/4 lg:w-3/4 mx-auto outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300 ease-in-out"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 mt-5">
            {questionsAndAnswers.map(({ question, answer }, index) => (
              <div key={index} className="w-full">
                <div className="bg-gradient-to-r from-orange-600 to-orange-200 text-transparent bg-clip-text text-3xl mb-5 text-center">
                  {question}
                </div>
                <AnswerComponent answer={answer} />
              </div>
            ))}
            <textarea
              style={{
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onChange={handleChange}
              onKeyDown={onKeyDown}
              placeholder="Please type here"
              value={first}
              className="  border-2
              fixed bottom-6
              border-orange-600 bg-black pl-6 pt-2 rounded-full md:rounded-lg w-11/12 md:w-3/4 lg:w-3/4 mx-auto outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300 ease-in-out"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
