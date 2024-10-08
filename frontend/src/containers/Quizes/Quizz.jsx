import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API_URL from "@/url";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Quizz = ({ user, error, isAuthenticated }) => {
  useEffect(() => {
    const checkAuth = async () => {
      await isAuthenticated;
      if (!isAuthenticated) {
        navigate("/");
      }
    };
    checkAuth();
  }, [isAuthenticated]);

  const navigate = useNavigate();
  let { difficulty } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [questionData, setQuestionData] = useState({
    id: "",
    title: "Listen to the audio and type what you hear",
    correctAnswer: "",
    num: 0,
    type: "audio",
    audioData: "",
  });
  const { id, title, correctAnswer, num, type, audioData } = questionData;

  let fetched = false;
  useEffect(() => {
    if (!fetched) {
      setIsLoading(true);
      fetchQuizzes();
      fetched = true;
    }
  }, []);
  useEffect(() => {
    if (quiz) {
      if (localStorage.getItem("current_question") == 0) {
        const nextNum = num + 1;
        setQuestionData({
          id: quiz.id,
          title: "Listen to the audio and type what you hear",
          correctAnswer: quiz.answer,
          num: nextNum,
          type: "audio",
          audioData: quiz.audio,
        });
      } else {
        const nextNum =
          parseInt(localStorage.getItem("current_question"), 10) + 1;
        setQuestionData({
          id: quiz.id,
          title: "Listen to the audio and type what you hear",
          correctAnswer: quiz.answer,
          num: nextNum,
          type: "audio",
          audioData: quiz.audio,
        });
      }
      setIsLoading(false);
    }
  }, [quiz]);

  const parsedAnswers = JSON.parse(localStorage.getItem("answers"));

  const [answers, setAnswers] = useState(parsedAnswers);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [scoreMessage, setScoreMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAnswer.trim() === "") {
      alert("Answer cannot be empty");
      return;
    }

    const newAnswer = {
      id,
      answer: currentAnswer,
    };

    setAnswers([...answers, newAnswer]);
    setIsSubmitted(true);
    setFeedback(currentAnswer === correctAnswer ? "Correct" : "Wrong");
    localStorage.setItem("current_question", num);
  };

  useEffect(() => {
    if (answers) {
      localStorage.setItem("answers", JSON.stringify(answers));
      console.log(answers);
    }
  }, [answers]);

  const handleNextQuestion = () => {
    console.log(answers);
    fetchQuizzes();
    setIsLoading(true);

    setCurrentAnswer("");
    setIsSubmitted(false);
    setFeedback("");
  };

  const handleSubmitQuiz = async () => {
    setIsLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id, difficulty, answers });
    console.log(body);

    try {
      const res = await axios.post(`${API_URL}/quiz/submit`, body, config);
      console.log(res);
      const totalScore = await fetchScore();
      if (totalScore >= 0) {
        navigate(`/score/${totalScore}`);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setErrorMessage(err.response.data.error);
    }
  };

  const fetchScore = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id, difficulty });

    let score = -1;

    try {
      const res = await axios.post(`${API_URL}/quiz/score`, body, config);
      console.log(res);
      score = res.data.score;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setErrorMessage(err.response.data.error);
    }
    return score;
  };

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(
    timeLeft % 60
  ).padStart(2, "0")}`;

  const fetchQuizzes = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id, difficulty });

    try {
      const res = await axios.post(`${API_URL}/quiz`, body, config);
      console.log(res);
      setQuiz(res.data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setErrorMessage(err.response.data.error);
    }
  };

  const [audioUrl, setAudioUrl] = useState("");

  // Convert base64 to ArrayBuffer
  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Convert base64 string to Blob and create an object URL
  const createAudioUrl = (base64) => {
    const arrayBuffer = base64ToArrayBuffer(base64);
    const blob = new Blob([arrayBuffer], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  // Trigger audio URL creation when the component mounts
  useEffect(() => {
    if (audioData) {
      createAudioUrl(audioData);
      return () => {
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
      };
    }
  }, [audioData]);

  const onQuitQuiz = () => {
    navigate("/userdashboard");
  }

  return (
    <div className="flex items-center w-full justify-center h-screen">
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className=" md:w-[80%] md:flex gap-6 mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="md:hidden">
            <div className="bg-stone-700 p-5 mb-2 rounded-lg">
              <p className="text-3xl text-center font-medium text-yellow-400 md:text-5xl w-24">
                {formattedTime}
              </p>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                <p className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Question {num} of 10
                </p>
              </CardTitle>
              <CardDescription>
                <p className="text-2xl font-medium text-secondary md:text-3xl my-3">
                  {title}
                </p>
              </CardDescription>
            </CardHeader>
            {isLoading ? (
              <div className="h-48 flex items-center justify-center">
                <img src="/images/loading.gif" className="h-40" />
              </div>
            ) : (
              <CardContent className="h-48">
                {type == "text" ? (
                  ""
                ) : (
                  <div>
                    {audioUrl && (
                      <audio key={audioUrl} controls>
                        <source src={audioUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                )}
                <hr className="bg-primary text-primary h-1 my-2" />
                <p className="text-2xl font-extrabold text-secondary md:text-3xl">
                  Answer
                </p>
                <form
                  className="flex gap-3 items-center"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <Input
                    className="bg-white my-2"
                    value={currentAnswer}
                    onChange={handleAnswerChange}
                    disabled={isSubmitted}
                  />
                  <Button disabled={isSubmitted} type="submit">
                    Submit
                  </Button>
                </form>
                <div>
                  {feedback && (
                    <p
                      className={
                        feedback == "Wrong"
                          ? "text-red-400 text-2xl font-bold"
                          : "text-green-400 text-2xl font-bold"
                      }
                    >
                      {feedback}
                    </p>
                  )}
                </div>
              </CardContent>
            )}

            <CardFooter>
              <div className="my-2 flex gap-2">
                {num < 10 ? (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!isSubmitted}
                    className="bg-secondary hover:bg-stone-500"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={!isSubmitted}
                    className="bg-secondary"
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </CardFooter>
            <div>
              <AlertDialog>
                <AlertDialogTrigger className="w-full">
                  <Button className="w-full bg-stone-800">Quit quiz</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to quit from this quiz.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onQuitQuiz()}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
          <div className="hidden md:block">
            <div className="bg-stone-700 p-12 rounded-lg">
              <p className="text-3xl font-medium text-yellow-400 md:text-5xl w-24">
                {formattedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Quizz);