import { Button } from "@/components/ui/button";
import API_URL from "@/url";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { connect } from "react-redux";

const UserDashboard = ({ isAuthenticated }) => {
  const { toast } = useToast();

  const [errorMessage, setErrorMessage] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [average, setAverage] = useState("0");
  const [easyRecent, setEasyRecent] = useState(0);
  const [mediumRecent, setMediumRecent] = useState(0);
  const [hardRecent, setHardRecent] = useState(0);

  const navigate = useNavigate();
  const fetchQuizzes = async (difficulty) => {
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
      navigate(`/quizz/${difficulty}`);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  const handleButtonClick = (difficulty) => {
    fetchQuizzes(difficulty);
    localStorage.setItem("current_question", 0);
    const answers = [];
    const stringifiedAnswers = JSON.stringify(answers);
    localStorage.setItem("answers", stringifiedAnswers);
  };

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        navigate("/");
      }
    };
    checkAuth();
  }, [isAuthenticated]);

  useEffect( () => {
    fetchAverage();
    const fetchRecent = async () => {
      let score = await fetchScore("easy");
      setEasyRecent(score);
      score = await fetchScore("medium");
      setMediumRecent(score);
      score = await fetchScore("hard");
      setHardRecent(score);
    }
    fetchRecent();
  }, []);

  const fetchScore = async (difficulty) => {
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

  const fetchAverage = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id });

    let score = -1;

    try {
      const res = await axios.post(`${API_URL}/average`, body, config);
      console.log(res);
      score = res.data.average;
      setAverage(score);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setErrorMessage(err.response.data.error);
    }
    return score;
  };

  return (
    <div>
      <Navbar />
      <section className="">
        <div className="mx-auto max-w-screen-xl min-h-[20rem] px-4 pt-12 sm:px-6 md:pt-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Your dashboard
            </h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
              Take our quiz to assess your ear health and get personalized
              feedback.
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button onClick={() => handleButtonClick("easy")}>
                    Start Quiz
                  </Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Easy
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button onClick={() => handleButtonClick("medium")}>
                    Start Quiz
                  </Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Medium
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button onClick={() => handleButtonClick("hard")}>
                    Start Quiz
                  </Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Hard
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <hr className="bg-primary text-primary h-1 my-2 mt-10 mx-10"/>
      <section>
        <div class="max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            

            <div class="flex flex-col border rounded-xl bg-stone-50">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-sm font-semibold text-gray-500">
                    Average Score
                  </p>
                </div>

                <h3 class="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                  <span class="font-semibold">{average}</span>{" "}
                  <span class="text-gray-500">/ 100</span>
                </h3>
              </div>
            </div>

            <div class="flex flex-col border rounded-xl bg-stone-50">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-sm font-semibold text-gray-500">Recent Score (Easy)</p>
                </div>

                <h3 class="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                  <span class="font-semibold">{easyRecent == -1? "Nan" : easyRecent}</span>{" "}
                  <span class="text-gray-500">/ 10</span>
                </h3>
              </div>
            </div>
            <div class="flex flex-col border rounded-xl bg-stone-50">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-sm font-semibold text-gray-500">Recent Score (Medium)</p>
                </div>

                <h3 class="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                  <span class="font-semibold">{mediumRecent == -1? "Nan" : mediumRecent}</span>{" "}
                  <span class="text-gray-500">/ 10</span>
                </h3>
              </div>
            </div>
            <div class="flex flex-col border rounded-xl bg-stone-50">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-sm font-semibold text-gray-500">Recent Score (Hard)</p>
                </div>

                <h3 class="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                  <span class="font-semibold">{hardRecent == -1? "Nan" : hardRecent}</span>{" "}
                  <span class="text-gray-500">/ 10</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserDashboard);