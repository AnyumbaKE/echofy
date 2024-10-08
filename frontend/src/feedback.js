const feedbackMessages = {
    below4: [
        ["Concerns Regarding Your Ear Health",
         "Your score indicates that there may be some significant concerns regarding your ear health. This score suggests that certain aspects of your ear health might need attention and improvement. Here are some steps and considerations to help you address these concerns:"],
        ["Consult a Healthcare Professional",
         "It's crucial to seek advice from a healthcare provider, such as an audiologist or an ear, nose, and throat (ENT) specialist. They can perform a thorough examination and provide a detailed assessment of your ear health. This professional evaluation is vital to identify any underlying conditions that might be affecting your hearing or overall ear health."],
        ["Regular Ear Check-Ups",
         "Schedule regular check-ups with a healthcare professional. Regular monitoring can help in early detection and management of potential ear health issues. Consistent follow-ups will ensure that any problems are addressed promptly and effectively."],
        ["Ear Hygiene Practices",
         "Ensure that you are following proper ear hygiene practices. This includes avoiding the use of cotton swabs inside the ear canal, as they can push earwax deeper and potentially cause damage. Instead, clean your ears gently with a damp cloth around the outer ear."],
        ["Protect Your Ears",
         "Protect your ears from excessive noise exposure. If you are frequently in noisy environments, consider using earplugs or noise-canceling headphones. Limiting exposure to loud sounds can prevent hearing loss and other ear health issues."],
        ["Healthy Lifestyle Choices",
         "Maintain a healthy lifestyle, as general health can impact ear health. This includes a balanced diet, regular exercise, and avoiding smoking and excessive alcohol consumption."],
        ["Stay Informed",
         "Educate yourself about ear health and hearing loss prevention. Understanding how to take care of your ears and recognizing early signs of problems can empower you to take proactive steps."]
    ],
    below7: [
        ["Room for Improvement",
         "You're on the right track, but there is still room for improvement in your ear health habits. While you may not have significant issues, adopting better practices can help enhance your ear health. Here are some recommendations:"],
        ["Enhance Ear Care Routine",
         "Review and enhance your ear care routine. Ensure that you are cleaning your ears properly and avoiding harmful practices such as inserting objects into the ear canal. Consider using ear drops recommended by healthcare professionals to maintain ear hygiene."],
        ["Monitor Noise Exposure",
         "Pay attention to the noise levels you are exposed to daily. Use ear protection in loud environments and try to limit the use of headphones or earphones at high volumes. Following the 60/60 rule (no more than 60% volume for no longer than 60 minutes at a time) can be beneficial."],
        ["Regular Hearing Tests",
         "Incorporate regular hearing tests into your health routine. Even if you don't notice any issues, periodic tests can help in early detection of hearing loss and other ear problems. Early intervention can make a significant difference."],
        ["Healthy Diet and Exercise",
         "Maintain a healthy diet rich in vitamins and minerals that support ear health. Exercise regularly to improve blood circulation, which can positively impact your hearing."],
        ["Stay Hydrated",
         "Ensure that you are staying hydrated. Proper hydration is essential for maintaining the fluid balance in your body, including the inner ear."],
        ["Stress Management",
         "Practice stress management techniques such as meditation, yoga, or deep breathing exercises. Stress can impact your overall health, including your ears."]
    ],
    below10: [
        ["Good Ear Health Habits",
         "Great job! Your score suggests that you have good ear health habits. Here are some tips to help you maintain and continue improving your ear health:"],
        ["Continue Regular Check-Ups",
         "Even with good ear health, regular check-ups with an audiologist or ENT specialist are important. These visits ensure that any potential issues are caught early and managed effectively."],
        ["Protect Your Hearing",
         "Keep protecting your ears from loud noises. Use earplugs or noise-canceling headphones in noisy environments and follow safe listening practices with personal audio devices."],
        ["Maintain Hygiene Practices",
         "Continue with proper ear hygiene. Avoid inserting objects into your ears and use gentle methods to clean the outer ear."],
        ["Healthy Lifestyle",
         "Stick to a healthy lifestyle. Balanced nutrition, regular exercise, and avoiding harmful habits like smoking and excessive alcohol consumption contribute to overall and ear health."],
        ["Stay Informed",
         "Keep yourself informed about ear health. Stay updated with the latest research and recommendations from healthcare professionals."],
        ["Hydrate and Rest",
         "Ensure you are drinking plenty of water and getting enough rest. Both hydration and adequate sleep play a crucial role in maintaining overall health, including the health of your ears."],
        ["Maintain Good Practices",
         "By following these guidelines, you can continue to enjoy good ear health and prevent potential issues in the future. Keep up the good work and stay proactive about your ear care!"]
    ]
};

export default function getFeedbackMessage(score) {
    if (score < 4) {
        return feedbackMessages.below4;
    } else if (score < 7) {
        return feedbackMessages.below7;
    } else if (score < 10) {
        return feedbackMessages.below10;
    } else {
        return ["Excellent! You've achieved a perfect score. Your ear health habits are exemplary. Keep maintaining your current routine."];
    }
}