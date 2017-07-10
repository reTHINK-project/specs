## IDModule Evaluation

In order to evaluate the performance of the developed ID Module, several tests were performed to evaluate the performance cost within the reTHINK framework. This evaluation covers the following features: identity acquisition from a user, the mutual authentication protocol and the secure communication using messages. Tests that required two users in different web browsers are demonstrated using the fictional users Alice and Bob, which are represented with the letter ‘A’ and ‘B’, respectively.

### Methodology

For this evaluation, 1000 samples were taken for each test and averages of these samples were considered. The tests were performed on a computer with the following characteristics: CPU with an intel core i5-3210M running at 2.5 Ghz, 8GB of memory RAM and the Ubuntu 14.04 LTS operating system. The tests were performed on the components developed and integrated in the reTHINK framework.
To test the ID Module integrated in the reTHINK framework, scripts were made in JavaScript language to allow them to run in the web browser and to allow data to be retrieved. Since some scenarios requires two users to evaluate the component, for example the mutual authentication protocol, two web browsers were used, namely Chromium and Chrome. Each browser represents a single user running an instance of the reTHINK application. The decision to separate the users in different browsers comes from the need to ensure that each instance of the reTHINK application running in the browser has its own resources and is running isolated from each other. The Chromium and the Chrome web browsers were chosen given their structure similarity. To measure the times of each method or sub parts of the methods, the performance tool (https://www.w3.org/TR/hr-time-2/) which offers an API to obtain the current time in sub-millisecond resolution was used. To calculate the time each part takes, the 'performance.now()' function was called at the beginning of the method under test and called again at the end of the method to be tested. The measured time is the difference from the time obtained in the end minus the time obtained at the beginning.

### User Authentication

The process of authenticating a user and obtaining his identity comprises several steps. Starting
by the generation of a public/private key pair for the RSA protocol, followed by the call to the IdP to
generate the assertion. In the first call a URL to authenticate is obtained. A second call for the generate
assertion method to actually obtain the identity assertion followed by the storage of this identity. The
times for these steps were measured to find the performance cost added to the reTHINK framework by
using the developed solution which is based on the WebRTC standard. For those tests, Google IdP
proxy, developed in this Thesis was used to obtain the identity. This test ignores the time the user takes
to select the identity via the GUI and the time the user takes to insert his credentials.
Figure 1 illustrates the time each component takes for the whole process of identity acquisition, showing an average of 1000 measures. These results suggest that, the methods with more impact on performance are the generation of the public/private key pair, the opening of a new window and the second call of the generate assertion method. The key generation time, taking about 200 ms, is relevant. However the main impact is in the opening of a new window, followed by the second call to the generate assertion. This second call includes the time the IdP takes to generate the assertion itself.
