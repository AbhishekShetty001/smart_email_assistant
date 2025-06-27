console.log("hello")

function findComposeToolbar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function getEmailContent() {
    const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}


function createAiButton() {

    const button = document.createElement('div');
    button.className = 'T-J J-J5-Ji ao0 v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI reply');
    return button;

}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        return;
    }
    console.log("creating a ai button");
    const button = createAiButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = "Generating.....";
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8888/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error('api request failed');
            }

            const generatedReply = await response.text();
            const composebox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composebox) {
                composebox.focus();
                document.execCommand('insertText', false, generatedReply);
            }
            else {
                console.error("composebox was not found");
            }

        } catch (error) {
            console.error("failed to generate");
            alert("failed to generate");
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }

    });

    toolbar.insertBefore(button, toolbar.firstChild);


}
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hascomposedelement = addedNodes.some(node =>
            node.nodeType == node.ELEMENT_NODE &&
            (node.matches('.aDh,.btC,[role="dialog"]')) || node.querySelector('.aDh,.btC,[role="dialog"]')
        );

        if (hascomposedelement) {
            console.log("compose detected");
            setTimeout(injectButton, 500);
        }
    }
});


observer.observe(document.body, {
    childList: true,
    subtree: true
})