#!/bin/sh

set -e

if echo "${INPUT_TEXT}" | grep -Eq "${INPUT_REGEX}"; then
    echo "::set-output name=match::true"
    exit 0
fi

echo "::set-output name=match::false"
