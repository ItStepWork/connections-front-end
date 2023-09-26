import styles from "./styles.module.scss";

const Protect = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.firstLine}>Ensure security, integrity and safety when using Meta Products. The development of Meta Products places great emphasis on research and ensuring the security, integrity and safety of the services and people who use them, within Meta Products and beyond. We use automated methods to process the data we hold about you and, in some cases, check it manually (by staff) in order to:</p>
        <ul className={styles.list}>
          <li>confirmation of accounts and actions;</li>
          <li>Detection and suppression of violations of our terms and conditions. In some cases, decisions we make regarding violations are reviewed by an authorized person</li>
          <li>investigation of suspicious activities;</li>
          <li>detect, prevent and combat harmful or illegal behavior, in particular to review and, in some cases, remove content that has been reported to us;</li>
          <li>identifying and challenging inequalities and racial bias against communities that have been marginalized in the past;</li>
          <li>protecting the life, physical and mental health, emotional well-being or integrity of our users or others;</li>
          <li>detecting and preventing spam and other unpleasant situations, as well as resolving security issues;</li>
          <li>detect and eliminate threats to our personnel and property;</li>
          <li>maintaining the integrity of our Products.</li>
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
          <li>Any information that requires special protection that you choose to provide, such as your religious views, sexual orientation, political opinions, health, race or ethnic origin, philosophical beliefs or trade union membership, or information provided as part of surveys in which you choose participate, as well as in situations where you have given explicit consent.</li>
          <li>Information and content you provide, such as your name or email address.</li>
        </ul>
        <p>To communicate with you: We use the information you provide (such as contact information in your profile) to send you communications such as emails or notifications, such as:</p>
        <ul className={styles.firstLine}>
          <li>We will contact you via email or in-product notices regarding Meta Products regarding product-related issues, to conduct research, or to inform you of our terms and policies.</li>
        </ul>
        <p>We also use contact information, such as your email address, to respond to your communications with us.</p>
        <p>Process sensitive information that you provide so that we can share it with the people you choose and provide, personalize, and improve our Products and analytics. For these purposes, we will collect, store and publish them, as well as use automated and sometimes manual processing methods (by employees).</p>
        <p>In some cases, we anonymize the information we have about you, such as your activities on and off our Products, and use the resulting information, for example, to provide and improve our products, including advertising.</p>
      </div>
    </>
  )
}
export default Protect;
