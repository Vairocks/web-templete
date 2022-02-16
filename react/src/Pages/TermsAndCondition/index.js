import React from 'react';
import { withRouter } from 'react-router-dom'
import './Style.scss';


const TermsAndCondition = (props) => {
    return (
        <>
            <div className="blogTopSection">
            
                {/* <img src={bgImage} className="blogImageTop" /> */}
                <div className="blogTopInfo">
                    <div className="infoText">
                        <p className="blogTitle">Terms &amp; conditions</p>
                    </div>
                </div>
            </div>
            <div className="termsConditionBlock">
                <p className="enrollMessageTitle">Welcome to Zivov</p>
                <div className="blockContainer">
                <p className="enrollMessage">These Terms (or “Agreement”) is an agreement between you (the “User”, “Patient”, “Doctor”) and Zivov Technololgies Private Limited ("Zivov") in connection with your visit and your use of services offered by Zivov.</p>
                <p className="enrollMessage1">These terms apply to websites (with domain: www.zivov.com and all sub-domains) and the mobile applications (including Zivov for Android), owned and operated by Zivov Technoliges Private Limited, 2264/C-2 Vasant Kunj, New Delhi – 110070. India.</p>
                <p className="listTitle">Definitions</p>
                <ul className="Listul">
                    <li>‘Zivov App’ refers to ‘Zivov’ mobile application meant for patients, his/her guardian, representatives or affiliates of patients.</li>
                    <li>‘Platform’ refers to Zivov app, Zivov For Doctors app and the websites (www.zivov.com), collectively.</li>
                    <li>‘Third Party’ refers to any application, website, company or individual apart from the user and the creator of the application.</li>
                    <li>‘You’, ‘Your’ refers to patients, or affiliates of patients: friends, family members or any such person who is directly or indirectly related to the patient and is using the platform on patient’s behalf. It also implies to Doctors, a medical practitioner, healthcare provider (whether an individual professional, a care team or an organization) or similar institution including designated, authorized associates of such practitioners or institutions.</li>
                    <li>‘Doctor’ shall mean any person permitted to practice medicine by the MCI (Medical Council of India).</li>
                    <li>‘Zivov Care team’ refers to in-house care team of Zivov comprising of doctors, clinical researchers, counselor and meditation experts, fitness and external consulting doctors engaged with Zivov.</li>
                    <li>‘Program’ refers to the various specialized lifestyle modification and disease management programs offered by Zivov.</li>
                    <li>‘Parties’ refer to User and Zivov, collectively. </li>
                </ul>
                <p className="listTitle">Nature and applicability of Terms</p>
                <p className="enrollMessage1">By accessing or registering or using Zivov platform, you agree to be bound by these Terms and the Privacy Policy. If you do not agree to be bound by these Terms and the Privacy Policy, please do not access or use the Zivov platform and services.The Agreement applies to you whether you are:</p>
                <ul className="Listul">
                    <li>A patient, his/her guardian, representatives or affiliates, interacting with Zivov care team (“End-User”, “you”, “member”, or “User”); or</li>
                    <li>A medical practitioner or Doctor (whether an individual professional, a care team or an organization) or similar institution including designated, authorized associates of such practitioners or institutions (“HCP(s)”, “Doctor”, “you” or “User”) wishing to avail the services provided by Zivov; or</li>
                    <li>Otherwise a user of the Zivov platform (“you” or “User”).</li>
                </ul>
                <p className="enrollMessage1">If you are accessing the Zivov mobile application, then this Agreement shall continue to apply to such use. In addition, there may be additional terms (such as the terms imposed by mobile application stores), which shall additionally govern the use of the mobile application. </p>
                <p className="listTitle">Use of Platform by Patients</p>
                <ul className="Listul">
                    <li>Zivov app is a platform for you (patient) to avail various lifestyle modification programs and services offered by Zivov Care team. You can use Zivov to connect with your doctor and/ or Zivov Care team, and discuss topics related to your health and well-being. Zivov app is meant for convenience and is not a substitute for physical clinic visit.</li>
                    <li>Doctor, Zivov Care team and Zivov do not guarantee medical treatment on the platform. The advice provided by the doctor or Zivov Care team is subject to the limitations of an online platform and the doctor may require you to visit him / her physically at the clinic.</li>
                    <li>Not for emergency use: Use of Zivov app is not appropriate for emergencies. If you (patient) think you have a potential or actual medical or mental health emergency, or if at any time you are concerned about your treatment, please visit the nearest clinic or hospital.</li>
                    <li>Informed consent: Doctor and Zivov Care team may share patient’s health data, consult query and other information with other doctors to provide patient an informed consultation.</li>
                    <li>The services available on Zivov do not in any way constitute an invitation or recommendation to avail the services. Zivov, is not a substitute for a primary care doctor, or in-person health care interactions. You agree not to use Zivov as a substitute for a primary care doctor or in-person doctor visits.</li>
                    <li>Zivov, Zivov Care team and doctor shall not be liable for misdiagnosis/ faulty judgment/ interpretation error/ perception error resulting from (i) your failure to provide correct and/ or complete clinical information/ history about the patient in timely and clinically appropriate manner; or (ii) suppression of material facts; or (iii) your failure to provide relevant clinical information about the patient; or (iv) misinterpretation of the advice/ prescription/ diagnosis by you; or (v) failure to follow doctor's advice/ prescription by you; or (vi) failure to follow or adhere to the advice of Zivov care team.</li>
                    <li>Zivov, Zivov Care team and the doctor shall not be held responsible or liable for any errors (e.g. typo).</li>
                    <li>Zivov, does not take responsibility for any advice given during the interactions on the platform by the doctor and Zivov Care team to the patient, and the agreement with and implementation of that advice is solely at the discretion of the patient.</li>
                    <li>While Zivov takes steps to verify the medical registration of doctor, Zivov makes no guarantees, representations or warranties, whether expressed or implied, with respect to subjective details such as quality of work, expertise or other information provided by the doctor on their profiles. Zivov does not recommend or endorse any specific individual and/or doctor(s) that may be mentioned on the website or mobile application.</li>
                    <li>You must be 18 years of age or older to register, use the services, or visit or use the Zivov app in any manner. By registering, visiting and using the website or mobile application, accepting this Agreement, you represent and warrant to Zivov that you are 18 years of age or older, and that you have the right, authority and capacity to use the mobile Application, website and the services offered by Zivov, and agree to and abide by this Agreement.</li>
                </ul>
                <p className="listTitle">Use of Platform by Doctor</p>
                <ul className="Listul">
                    <li>Zivov offers doctors a platform to set up and operate their online/virtual ‘clinics’ and offer their services to their patients. Doctor shall treat the patient as they would in an in-clinic consultation and perform services and fulfil the obligations towards the patients to the best of their knowledge and skill.</li>
                    <li>Doctor shall not provide consultation and ‘cancel’ the consultation request in case a physical examination for the patient is required.</li>
                    <li>Doctor confirms and warrants that he/she has the required valid license to provide medical services and has not committed any act or omission that might prejudice its continuance or renewal.</li>
                    <li>Doctor represents that he/ she is qualified to provide medical services within the territory of India.</li>
                    <li>Doctor represents that he/she has provided true, accurate, complete and up-to-date details about their qualification and credentials to Zivov. Doctor is solely responsible for the authenticity and validity of the information they provide on their profiles on Zivov.</li>
                    <li>Doctor shall promptly renew his/her licenses required to provide medical services and notify Zivov of any updates or changes to their medical registration numbers and/or licenses.</li>
                    <li>Doctor is solely responsible for the interactions with patients via the Zivov platform. Doctor may under no circumstances transfer the performance of their services to any other person, whether under their supervision or not. The doctor accepts all responsibility and liability for the use of Zivov platform, including the performance of its services by any other party claiming to be the doctor and agrees to indemnify Zivov against any claim or loss that may be faced by Zivov as a consequence of such misuse.</li>
                    <li>Doctor understand that the information provided by them (in particular the profile content), may be made available to the general public, including Zivov users and that you have no objection to the same.</li>
                    <li>Soliciting of patients directly or indirectly, by a doctor, by a group of doctor or by institutions or organizations is unethical. Zivov platform app is not intended to solicit patients. You, (‘Doctors’) cannot pay for marketing, getting listed or rating on Zivov platform.</li>
                </ul>
                <p className="listTitle">Medical Advice</p>
                <ul className="Listul">
                    <li>The information and communication through Zivov is not intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of a doctor for any questions the user may have regarding a medical condition. Zivov does not endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned or shared by Zivov.</li>
                    <li>In no event, Zivov shall be liable to the user or anyone else for any decision made or action taken by the user or anyone else on basis of the information provided on the Website and/or Mobile Application. No medical, legal or any other decision shall be based solely upon the information provided through Zivov.</li>
                </ul>
                <p className="listTitle">Payments and Purchases</p>
                <ul className="Listul">
                    <li>You may decide to buy plans, products and services through Zivov. Payment for such purchases is your responsibility and can be executed through different means including (but not limited to) credit and debit cards, gift coupons, direct bank transfer, third-party payment services, payment wallets and gateways and in some cases cash.</li>
                    <li>You are responsible for providing valid payment information (for any of the payment means including but not limited to those mentioned above) at the time you purchase any plans, products and services.</li>
                    <li>You represent and warrant that you are an authorized user of such payment means, and you agree to pay all charges resulting from your transaction at the prices then in effect. You agree that Zivov may pass your payment information (e.g credit card) and related personally identifiable information to its designated service provider(s) for their use in charging you for appropriate services utilized. The ultimate responsibility of payment lies with the purchaser of the plans, products and/or services.</li>
                    <li>The charges for any plans, products or services may attract taxes, cess or any other charges as levied by competent authorities in a given region. These additional charges shall be borne by the purchaser and shall be paid at the time of purchase.</li>
                    <li>Zivov reserves the right to modify or terminate membership plans, change prices, or institute new charges for any product or service at any time.</li>
                </ul>
                <p className="listTitle">Cancellation Policy </p>
                <p className="enrollMessage1">We understand that you may change your mind and not continue our programs. You can cancel our program at any time by telling your coach or dropping a mail to info@zivov.com. Our refund policy for the programs are as below-</p>
                <ul className="Listul">
                    <li>100% refund before the start of the program.</li>
                    <li>Cancellation within 7 days of start of the program refund is – 50%</li>
                    <li>Cancellation after 7 days no refund will be given.</li>
                </ul>
                <p className="listTitle">Communications to the User</p>
                <ul className="Listul">
                    <li>By registering on Zivov (or by applying for Zivov product and services or by requesting a call back, it is deemed that you have consented to receiving telephonic calls, SMS (text message), notifications, reminders and/or emails from Zivov. Such communications shall be sent to you on the telephone number and/or email id provided by you. Such communication by Zivov is for purposes that inter alia include clarification calls, marketing calls and promotional calls.</li>
                    <li>You can opt out of Zivov communication by writing to contact@zivov.com shall manually unsubscribe you from all its communication.</li>
                </ul>
                <p className="listTitle">Links to Third Party</p>
                <p className="enrollMessage1">In some cases, when you click on a link or an advertisement on Zivov platform, or in an e-mail or newsletter, your browser may be momentarily directed to the third-party Websites / Applications / content or service providers, including advertisers and e-commerce websites (collectively "third Party websites").</p>
                <p className="enrollMessage1">Zivov does not endorse any third-party websites that you may be directed, to from the link or an advertisement on Zivov platform, or in an email or newsletter. Links to such third-party websites are provided for your convenience only. Please exercise your independent judgment and prudence when visiting/ using any third-party websites via a link available through Zivov. Should You decide to click on the links to visit such third-party website, you do so of your own volition. Your usage of such third-party websites and all content available on such third-party websites is subject to the terms of use of the respective Third-Party website and Zivov is not responsible for your use or access of any third-party websites. </p>
                <p className="listTitle">Account Security and Privacy</p>
                <ul className="Listul">
                    <li>You, the user, are responsible for maintaining the confidentiality of your account and all the communication shared by Zivov with you via Zivov app, SMS or email. You must immediately notify Zivov in case your account is compromised.</li>
                    <li>You are not permitted to allow any other person or entity to use your identity for using any of Zivov platform / services.</li>
                    <li>You may add dependents to your account on Zivov app. If you seek consults and/ or access your dependents’ records through your Zivov account, you are responsible for the records of your dependents and all obligations that your dependents would have had, had they maintained their own individual Zivov account. </li>
                </ul>
                <p className="listTitle">International Users Consent</p>
                <ul className="Listul">
                    <li>Zivov makes no representation that all products, content or services described on or available through the Zivov platform, are appropriate or available for use in locations outside India. Users and visitors can access Zivov content and services on their own initiative and are responsible for compliance with local laws.</li>
                    <li>Zivov makes no claim that content or services are appropriate or may be downloaded outside of India. Personal information ("Information") that is submitted to Zivov platform shall be collected, processed, stored, disclosed and disposed of in accordance with applicable law and Zivov Privacy Policy. If you are a non-Indian member, you acknowledge and agree that Zivov may collect and use your information and disclose it to other entities outside your resident jurisdiction. In addition, such information may be stored on servers located outside your resident jurisdiction. The degree of protection for information shall be limited to and subject to the laws of land as applicable in India.</li>
                    <li>By providing Zivov with your information, you acknowledge that you consent to the transfer of such information outside your resident jurisdiction as detailed in these terms and Privacy Policy.</li>
                    <li>The product information provided on Zivov is presently intended only for residents of India and may have different product labeling and disclosure requirements in different countries.</li>
                </ul>
                <p className="listTitle">Acknowledgements</p>
                <ul className="Listul">
                    <li>Zivov has attempted to provide acknowledgement of sources as references for text, but there is likelihood that several acknowledgements are not mentioned. Zivov is certainly willing to correct omissions of citations and encourage Zivov readers to email Zivov with further information regarding the sources.</li>
                    <li>If the user believes any materials accessible on or from the Zivov platform infringe their copyright, they may request removal of those materials (or access thereto) from the mobile application and / or website by contacting Zivov and providing the following information:</li>
                    <li>Identification of the copyrighted work that the user believes to be infringed. Please describe the work, and where possible include a copy or the location (e.g., URL) of an authorized version of the work.</li>
                    <li>Identification of the material that the user believes to be infringing and its location. Please describe the material and provide Zivov with its URL or any other pertinent information that shall allow Zivov to locate the material.</li>
                    <li>User’s name, address, telephone number and (if available) e-mail address.</li>
                    <li>A statement that the user has a good faith belief that the complaint of use of the materials is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information that the user has supplied is accurate, and indicating that "under penalty of perjury," the user is the copyright owner or is authorized to act on the copyright owner's behalf.</li>
                    <li>A signature or the electronic equivalent from the copyright holder or authorized representative.</li>
                </ul>
                <p className="listTitle">Acknowledgements</p>
                <ul className="Listul">
                    <li>Information on the Zivov platform is for personal use and shall not be sold or redistributed. To reprint or electronically reproduce any document or graphic in whole or in part for any reason is expressly prohibited, unless prior written consent is obtained from Zivov.</li>
                    <li>All content on the Zivov platform including designs, text, graphics, pictures, information, applications, software, source and object code, music, sound and other files, (collectively and hereinafter referred to as the ‘Content’) and their selection and arrangement are the sole proprietary property of Zivov unless otherwise indicated. No one except Zivov has any right to modify, copy, perform, distribute, frame, reproduce, republish, upload, download, scrape, display, post, transmit, or sell in any form or by any means, in whole or in part, without Zivov’s prior written consent as they are protected under applicable copyright laws and treaty provisions (including but not limited to applicable intellectual property laws).</li>
                    <li>Zivov may from time to time share some content in shareable format. Such content can be shared as-is, without modification for general awareness. Such content cannot be shared for any commercial applications. </li>
                    <li>Content on Zivov is protected by copyright under both Indian and foreign laws. Title to the content remains with Zivov or its licensors. Any use of the content not expressly permitted will amount to infringement and breach of present agreement and violation of copyright, trademark, and other laws. Content and features are subject to change or terminate without notice in the editorial discretion of Zivov. All rights not expressly granted herein are reserved to Zivov and its licensors.</li>
                </ul>
                <p className="listTitle">Trademarks</p>
                <p className="enrollMessage1">Zivov and/or its licensors assert all proprietary rights in and to all names and trademarks contained on the Mobile Application and Website. Notwithstanding the generality of the foregoing, the name, "Zivov" is the trademark and copyright (or any other intellectual property right) of Zivov and/or its licensors. Any use of Zivov's trademarks or copyright, unless otherwise authorized in a written agreement, shall constitute an infringement upon the trademark and copyright (or any other such intellectual property right) of Zivov and may be actionable under the applicable laws.</p>
                <p className="listTitle">Privacy Policy</p>
                <p className="enrollMessage1">Zivov is committed to your privacy and data security. Zivov’s mission is to provide you with a solution that enables you to seek personalized and pertinent health advice and services and support your doctor-patient relationship by making it more accessible, affordable and intelligent. In delivering this mission, Zivov understands that privacy and data security is very important, and Zivov is constantly working to make sure that it offers you, as in other aspects of Zivov products, the highest standard of care.</p>
                <p className="enrollMessage1">This Privacy Policy explains what information is collected, how it is used and stored.</p>
                <p className="listTitle">User Conduct</p>
                <ul className="Listul">
                    <li>User shall use the Zivov platform and services for lawful purposes only. User shall not post or transmit through Zivov platform, any material which violates or infringes in any way upon the rights of others, which is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable.</li>
                    <li>User shall not use Zivov platform to advertise or perform any commercial solicitation.</li>
                    <li>The user also understands that Zivov cannot and does not guarantee or warrant that files available for downloading through the service shall be free of infection or viruses, worms or other code that manifest contaminating or destructive properties.</li>
                    <li>User shall not access the Zivov platform for any benchmarking or competitive purposes such as monitoring its availability, performance or functionality, and shall not resell, redistribute, or put to any commercial use, any content or information from this app or site. In case of violation, Zivov reserves the right to initiate appropriate legal action.</li>
                </ul>
                <p className="listTitle">Termination</p>
                <p className="enrollMessage1">Zivov reserves the right to terminate without notice the account of user or services offered by Zivov to the user if you fail to comply with the terms and privacy policy. Zivov may terminate the Agreement or restrict, suspend or terminate your access to Zivov platform as the case may be.</p>
                <p className="listTitle">Contact Information - Grievance officer</p>
                <p className="enrollMessage1">If a user has any questions concerning Zivov, the mobile application, website, this Agreement, the Services, or anything related to any of the foregoing, you can contact Zivov Grievance Officer at: Email: contact@zivov.com</p>
                <p className="listTitle">Linking to Zivov</p>
                <p className="enrollMessage1">Usually, you can have a link from your website to Zivov home page. However, you must first seek permission from Zivov if you intend to frame the Zivov site or incorporate pieces of it into a different site or product in a way that is not clear to Zivov users. You are not allowed to link to Zivov if you engage in illegal, obscene, or offensive content, or if the link in any way has a negative impact on Zivov’s reputation.</p>
                <p className="listTitle">Liability</p>
                <p className="enrollMessage1">The use of the Zivov platform, program and the content is at your own discretion. Zivov disclaim all or any liabilities whatsoever arising directly or indirectly to anybody as a result of use of Zivov platform, program and the content.</p>
                <p className="listTitle">Indemnity</p>
                <ul className="Listul">
                    <li>The patient shall provide correct and complete information pertaining to their health to the doctor and/ or Zivov Care team, upon the basis of which the consultation with the doctor and/ or Zivov Care team will depend. If any information provided by the user is found to be incorrect, misleading, or concealing, the doctor or Zivov Care team or Zivov shall not be held responsible for any adverse consequence.</li>
                    <li>Patient agree to indemnify, defend and hold harmless doctor(s) and Zivov Care team from your lack of adherence with the advice or recommendation(s) of doctor or Zivov care team.</li>
                    <li>Doctors indemnify Zivov and accepts all responsibility and liability for the use of Zivov platform and services, including the performance of their services by any other party claiming to be the doctor and agrees to indemnify Zivov against any claim or loss that may be faced by Zivov as a consequence of such misuse.</li>
                    <li>The users agree to defend, indemnify, and hold Zivov, its officers, directors, employees, agents, licensors, and suppliers, harmless from and against any claims, actions or demands, liabilities and settlements including without limitation, reasonable legal and accounting fees, resulting from, or alleged to result from, the users’ violation of these Agreement.</li>
                    <li>In no event shall Zivov and its parent organizations, subsidiaries and affiliates, and each of their directors, officers, agents, consultants, contractors, partners, employees, suppliers and sponsors be liable to the user or any third person for any indirect, consequential, punitive, special, incidental or exemplary damages of any type or kind, including loss of data, revenue, profits, or other economic advantage, arising out of or in any way connected with Zivov, including for any content obtained through the service, any error, omission, interruption, deletion, inaccuracy, defect, delay in operation or transmission, communications line failure, technical malfunction or other problems of any telephone network or service, computer systems, servers or providers, computer equipment, software, failure or email or players on account of technical problems or traffic congestion on the internet or at the mobile application or website or combination thereof. Under no circumstances shall Zivov be responsible for any loss or damage, including any loss or damage to any user content or personal injury or death, resulting from anyone's use of the mobile application, website or any user content posted on or through the mobile application or website or transmitted to users, or any interaction between users of the mobile application or website, whether online or offline with the doctor.</li>
                    <li>Zivov does not represent or warrant that software, content or materials on the Zivov platform are accurate, complete, reliable, current or error-free or that the mobile application, website or its servers, or any platform applications are free of viruses or other harmful components. The mobile application, website and all content are provided to the user strictly on an "as is" basis. Therefore, the user should exercise caution in the use and downloading of any such software, content or materials and use industry-recognized software to detect and disinfect viruses. Without limiting the foregoing, the users understand and agree that they download or otherwise obtain content, material, data or software from or through the mobile application or website at your own discretion and that you shall be solely responsible for your use thereof and any injury or damage to your or to any person's computer, or other hardware or software, related to or resulting from using or downloading materials in connection with the mobile application or website, theft or destruction or unauthorized access to, or alteration of the mobile application or website, loss of data or other harm of any kind that may result. The mobile application or website may be temporarily unavailable from time to time for maintenance or other reasons.</li>
                    <li>Zivov or its Care Team does not accept any liability for death, injury or any form of loss or damage incurred as a result of any use of or reliance on any information and/or service provided by Zivov or its Care Team including but not limited to direct, indirect, incidental or consequential loss or damages to the patient or its caregiver.</li>
                </ul>
                <p className="listTitle">Force Majeure</p>
                <p className="enrollMessage1">Zivov shall not be liable for any failure or unavailability of the platform as a result of the loss or destruction of data, the deletion or corruption of storage media, power failures, unavailability of suppliers or any other event beyond its control.</p>
                <p className="listTitle">Invalidity</p>
                <p className="enrollMessage1">If any one or more of the provisions contained in the Agreement should be determined to be invalid, illegal or unenforceable in any respect, the validity, legality and enforceability of the remaining provisions of the Agreement shall not in any way be affected or impaired thereby.</p>
                <p className="listTitle">Governing Law</p>
                <p className="enrollMessage1">This Agreement shall in all respects be governed by and be construed in accordance with the laws applicable in India.</p>
                <p className="listTitle">Dispute Resolution</p>
                <p className="enrollMessage1">In case of any dispute or difference, arising out of or in relation to (including interpretation thereof) the terms set out herein and/or pertaining to any transaction between the parties in consequence of the present agreement, the parties shall try to settle the same amicably, failing which the matter shall be referred to a Sole Arbitrator for arbitration under the Arbitration and Conciliation Act, 1996 and/or any statutory re-enactment or modification thereof, and the Sole Arbitrator shall be appointed by Zivov. The place of arbitration shall be New Delhi.</p>
                <p className="enrollMessage1">This Agreement shall be subject to laws of India and the jurisdiction of courts in New Delhi, India.</p>
                </div>
            </div>
        </>
    );

}

export default withRouter(TermsAndCondition);