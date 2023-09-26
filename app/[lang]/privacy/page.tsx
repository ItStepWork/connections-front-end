import styles from "./styles.module.scss";

const Privacy = () => {
  return (
    <>
    <div className={styles.container}>
      <p className={styles.firstLine}>Our systems automatically process information we collect and store about you and others to evaluate and understand your interests and preferences and to personalize your experience with various Meta Products in accordance with our terms. We need this to:</p>
      <ul className={styles.list}>
        <li>personalize features and content (for example: your posts and photos);</li>
        <li>show you recommendations (such as people you might know, groups or events that might interest you, or topics you might want to follow) on and off our products.</li>
      </ul>
      <p className={styles.firstLine}>Providing and improving our products includes the collection, storage and, if necessary, transmission, profiling, verification and selection of data, and in some cases not only its automated processing, but also manual verification (by employees), in order to:</p>
      <ul className={styles.list}>
        <li>creating and maintaining your account and profile;</li>
        <li>connecting your product account, including information from your public profile, to an integrated partner to sign in or share your information;</li>
        <li>simplifying the publication of content and status;</li>
        <li>providing messaging services;</li>
        <li>understanding and ability to create content such as text, images and video;</li>
        <li>performing analytics.</li>
      </ul>
      <p>We also use the information to develop, research and test improvements to our Products. We use the information we have to:</p>
      <ul className={styles.list}>
        <li>check whether the product works correctly;</li>
        <li>troubleshoot and correct errors if it does not work correctly;</li>
        <li>test new products and functions to verify their functionality;</li>
        <li>receive feedback with your ideas for products or features;</li>
        <li>conduct surveys and other research about your preferences regarding our Products and brands, as well as possible improvements.</li>
      </ul>
      <p className={styles.firstLine}>Categories of information we use</p>
      <ul className={styles.list}>
        <li>Content you create, such as posts, comments, or photos.</li>
        <li>The types of content you view or interact with and how you interact with it.</li>
        <li>The apps and features you use and the actions you take in them.</li>
        <li>Identifiers to distinguish your device from other users' devices</li>
        <li>Location information</li>
        <li>Information obtained through the use of cookies and other similar technologies</li>
        <li>Reports on the performance of our products on your device</li>
        <li>Information about the network you connect your device to, including your IP address</li>
        <li>Age</li>
        <li>Your specified gender</li>
        <li>Device characteristics and software</li>
        <li>Public profile information about you (including name, username and profile photo).</li>
        <li>The communications you send and receive, including their content, are subject to applicable law.</li>
        <li>Metadata about content and communications in accordance with applicable law.</li>
      </ul>
    </div>
    </>
  )
};

export default Privacy;
